export const STORE = {
  // common
  App: Symbol.for('AppStore'),
  Auth: Symbol.for('AuthStore'),
  File: Symbol.for('FileStore'),
  Filter: Symbol.for('FilterStore'),
  Locale: Symbol.for('LocaleStore'),
  Menu: Symbol.for('MenuStore'),
  Notify: Symbol.for('NotifyStore'),
  Option: Symbol.for('OptionStore'),

  // settings
  UserSettingsList: Symbol.for('UserSettingsListStore'),
  UserSettingsItem: Symbol.for('UserSettingsItemStore'),
  ModuleSettingsList: Symbol.for('ModuleSettingsListStore'),
  ModuleSettingsItem: Symbol.for('ModuleSettingsItemStore'),
  BlockSettingsList: Symbol.for('BlockSettingsListStore'),
  BlockSettingsItem: Symbol.for('BlockSettingsItemStore'),
  MaterialSettingsList: Symbol.for('MaterialSettingsListStore'),
  MaterialSettingsItem: Symbol.for('MaterialSettingsItemStore'),
  TaskSettingsList: Symbol.for('TaskSettingsListStore'),
  TaskSettingsItem: Symbol.for('TaskSettingsItemStore'),
  QuestionSettingsList: Symbol.for('QuestionSettingsListStore'),
  QuestionSettingsItem: Symbol.for('QuestionSettingsItemStore'),

  // school
  ModuleSchoolList: Symbol.for('ModuleSchoolListStore'),
  ModuleSchoolItem: Symbol.for('ModuleSchoolItemStore'),
  BlockSchoolItem: Symbol.for('BlockSchoolItemStore'),

  // progress
  // ...

  // ---
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
