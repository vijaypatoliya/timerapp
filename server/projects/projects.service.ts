import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectsSchema } from "./schema/projects.schema";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Project } from "./interfaces/projects.interface";
import { ListsService } from '../lists/lists.service';
import { List } from '../lists/interfaces/lists.interface';
import * as _ from 'underscore';
const ObjectId = require('mongoose').Types.ObjectId;

_.mixin({
    compactObject: function(o){
        _.each(o, function(v,k){
            if (!v) delete o[k];
        });
       return o; 
    }
});

@Component()
export class ProjectsService {
    constructor(
        @InjectModel(ProjectsSchema) private readonly projectModel: Model<Project>,
        private listsService: ListsService
    ){}

    async addProject(createProjectDto: CreateProjectDto): Promise<Project>{
        let query = {projectName: createProjectDto.projectName};
        let checkProject = await this.projectModel.findOne(query);
        if (checkProject) throw new HttpException('Project already exists!', HttpStatus.BAD_REQUEST);
        let newProject = new this.projectModel(createProjectDto);
        try {
            let project = await newProject.save();
            let list = await this.listsService.addDefaultList({
                listName: `${project.projectName} Default`,
                listDescription: `Other ${project.projectName} Tasks`,
                listProject: project._id
            });
            if (!list) throw new HttpException('Default list not created!', HttpStatus.BAD_REQUEST);
            return project;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async allProjects(): Promise<Project[]>{
        let projects = await this.projectModel.find().sort({projectCreated: 1});
        return projects;
    }

    async oneProject(params): Promise<Project>{
        let query = {_id: new ObjectId(params.id)};
        try {
            let oneProject = await this.projectModel.findOne(query);
            if (!oneProject) throw new HttpException('Project not found!', HttpStatus.BAD_REQUEST);
            return oneProject;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProject(params): Promise<Project>{
        let query = {
            _id: new ObjectId(params._id)
        };
        let set = _.compactObject(params);
        try {
            let updatedProject = await this.projectModel.findOneAndUpdate(query, set, {new: true});
            if (!updatedProject) throw new HttpException('Project not updated!', HttpStatus.INTERNAL_SERVER_ERROR);
            return updatedProject;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProject(params): Promise<any>{
        let query = {_id: new ObjectId(params._id)};
        try {
            let deletedProject = await this.projectModel.findOneAndRemove(query);
            if (!deletedProject) throw new HttpException('Project not deleted!', HttpStatus.INTERNAL_SERVER_ERROR);
            let deletedList = await this.listsService.deleteProjectLists({_id:deletedProject._id});
            if (!deletedList) throw new HttpException('Lists not deleted!', HttpStatus.BAD_REQUEST);
            return deletedProject;
        } catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}