// TODO: Write code to define and export the Employee class
class Employee{
    constructor(name,id,email){
        this.id = id;
        this.name = name;
        this.email = email;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
    //this return the name of class of the string
    getRole(){
        return this.constructor.name;
    }
}
module.exports = Employee
