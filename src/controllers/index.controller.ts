import { Controller, Get, Route } from 'tsoa';

@Route('')
export class IndexController extends Controller {
    @Get('')
    public async index() {
        return { msg: 'Verify the /doc path to see the documentation of this api.' };
    }

}