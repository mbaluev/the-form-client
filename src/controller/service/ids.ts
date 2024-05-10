export const SERVICE = {
  // common
  Auth: Symbol.for('AuthService'),
  File: Symbol.for('FileService'),
  Option: Symbol.for('OptionService'),

  // entities
  Block: Symbol.for('BlockService'),
  Material: Symbol.for('MaterialService'),
  Module: Symbol.for('ModuleService'),
  Question: Symbol.for('QuestionService'),
  Task: Symbol.for('TaskService'),
  User: Symbol.for('UserService'),
};
