#! /usr/bin/env node
import inquirer from "inquirer";
/// define the student class
class Student {
    static Counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.Counter++;
        this.name = name;
        this.courses = []; ///initialize an empty array for courses
        this.balance = 1000;
    }
    //method to enroll a student n a course
    enroll_Course(Course) {
        this.courses.push(Course);
    }
    //method to view a student balance
    view_balance() {
        console.log(`Balance of ${this.name} is $${this.balance}`);
    }
    //method to pay student fee
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fee Has Been Paid For ${this.name}`);
    }
    //method to diplay student status 
    display_status() {
        console.log(`id:${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses.join(`,`)} `);
        console.log(`Balance: ${this.balance}`);
    }
}
/// define student manager class to manage students
class student_manager {
    Students;
    constructor() {
        this.Students = [];
    }
    //method to add a student
    add_student(name) {
        let newstudent = new Student(name);
        this.Students.push(newstudent);
        console.log(`Student ${name} Has Added Sucessfully. Student ID: ${newstudent.id}`);
    }
    //method to inroll a student in a class
    enroll_student(student_id, course) {
        ///let studentcourse = this.Students.find(std => std.Id === student_id )
        let studentcourse = this.find_student(student_id);
        if (studentcourse) {
            studentcourse.enroll_Course(course);
            console.log(`${studentcourse.name} enrolled in ${course} successfully`);
        }
    }
    //method to view a student balance
    view_student_balance(student_id) {
        // let studentbalance = this.Students.find(std => std.Id === student_id )
        let studentbalance = this.find_student(student_id);
        if (studentbalance) {
            studentbalance.view_balance();
        }
        else {
            console.log(`Student Not Found .Please Entre A Correct Id`);
        }
    }
    //method to pay_fees
    pay_fees(student_id, amount) {
        let studentpay = this.find_student(student_id);
        if (studentpay) {
            studentpay.pay_fees(amount);
        }
        else {
            console.log(`Student Not Found .Please Entre A Correct Id`);
        }
    }
    //method to display student status
    show_student_status(student_id) {
        let studentstatus = this.find_student(student_id);
        if (studentstatus) {
            studentstatus.display_status();
        }
    }
    //method to find student by student id
    find_student(student_id) {
        return this.Students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log("Welcome To Governer Sindh Student Managment Systm");
    console.log("-".repeat(50));
    let students_manager = new student_manager();
    //while loop
    while (true) {
        console.log("Please Select An Option From Below");
        let Choices = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "Select An Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        switch (Choices.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([{
                        name: "name",
                        type: "input",
                        message: "Enter Student Name"
                    }]);
                students_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter Student Id"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter Course Name"
                    }
                ]);
                students_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter Student Id"
                    }]);
                students_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter Student Id"
                    }, {
                        name: "amount",
                        type: "number",
                        message: "Enter Amount"
                    }]);
                students_manager.pay_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Student Status":
                let student_Status = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter Student Id"
                    }]);
                students_manager.show_student_status(student_Status.student_id);
                break;
            case "Exit":
                console.log("Exiting The System");
                process.exit();
        }
    }
}
/// calling a main function
main();
