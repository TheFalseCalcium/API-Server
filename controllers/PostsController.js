import Controller from './Controller.js';
import PostModel from '../models/post.js';
import Repository from '../models/repository.js';
import { v4 as uuidv4 } from 'uuid';
import * as utilities from '../utilities.js';


export default class PostController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new PostModel()));
    }


    post(data) {
        data.Id=uuidv4();

        data = this.repository.add(data);
        if (this.repository.model.state.isValid) {
            this.HttpContext.response.created(data);
        } else {
            if (this.repository.model.state.inConflict)
                this.HttpContext.response.conflict(this.repository.model.state.errors);
            else
                this.HttpContext.response.badRequest(this.repository.model.state.errors);
        }
    }
}