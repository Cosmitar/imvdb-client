'use strict'
import Model from './../classes/Model';
import Browser from './../classes/Browser';

class Entity extends Model {
    constructor(data) {
        super(data);
        //check simplified
    }

    static get SINGLE_TYPE(){
        return 'entity';
    }

    static get FAMILY_TYPE(){
        return 'entities';
    }
}

export default Entity;