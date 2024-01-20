export const STORE = {
  // common
  App: Symbol.for('AppStore'),
  Auth: Symbol.for('AuthStore'),
  Filter: Symbol.for('FilterStore'),
  Locale: Symbol.for('LocaleStore'),
  Menu: Symbol.for('MenuStore'),
  Notify: Symbol.for('NotifyStore'),
  Option: Symbol.for('OptionStore'),

  // entities
  UserList: Symbol.for('UserListStore'),
  UserItem: Symbol.for('UserItemStore'),
  ModuleList: Symbol.for('ModuleListStore'),
  ModuleItem: Symbol.for('ModuleItemStore'),
  BlockList: Symbol.for('BlockListStore'),
  BlockItem: Symbol.for('BlockItemStore'),

  // old
  Block: Symbol.for('BlockViewModel'),
  Material: Symbol.for('MaterialViewModel'),
  Module: Symbol.for('ModuleViewModel'),
  Question: Symbol.for('QuestionViewModel'),
  Task: Symbol.for('TaskViewModel'),

  ModuleUser: Symbol.for('ModuleUserViewModel'),
  BlockUser: Symbol.for('BlockUserViewModel'),
  MaterialUser: Symbol.for('MaterialUserViewModel'),
  QuestionUser: Symbol.for('QuestionUserViewModel'),
  TaskUser: Symbol.for('TaskUserViewModel'),
  TaskUserDocument: Symbol.for('TaskUserDocumentViewModel'),

  ModuleAdmin: Symbol.for('ModuleAdminViewModel'),
  BlockAdmin: Symbol.for('BlockAdminViewModel'),
  MaterialAdmin: Symbol.for('MaterialAdminViewModel'),
  QuestionAdmin: Symbol.for('QuestionAdminViewModel'),
  TaskAdmin: Symbol.for('TaskAdminViewModel'),
  TaskAdminDocument: Symbol.for('TaskAdminDocumentViewModel'),
  UserAdmin: Symbol.for('UserAdminViewModel'),
};
