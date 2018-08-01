// Function for setting properties of a Project schema object
const setProjectObj = (input, project) => {
    project.title = input.title;
    project.categories = input.categories;
    project.description = input.description;
    project.tags = input.tags;
    project.status = input.status;
    project.tmdb = input.tmdb;
    project.users = input.users;

    return project;
};

module.exports = setProjectObj;