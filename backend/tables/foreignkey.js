import user from "./usertable.js";
import Job from "./jobtable.js";
import Application from "./applicationtable.js";
import Roles from "./rolestable.js";

Roles.hasMany(user, { foreignKey: 'roleId', as: 'users' });
user.belongsTo(Roles, { foreignKey: 'roleId', as: 'role' });

user.hasMany(Job, { foreignKey: 'userId', as: 'jobs' });
Job.belongsTo(user, { foreignKey: 'userId', as: 'creator' });

user.hasMany(Application, { foreignKey: 'userId', as: 'applications' });
Application.belongsTo(user, { foreignKey: 'userId', as: 'applicant' });

Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });

export { user, Job, Application, Roles };
