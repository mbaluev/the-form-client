import React from 'react';
import {
  SkeletonFieldControl,
  MultiSelectExtFieldControlEdit,
  MultiSelectExtFieldControlView,
  fieldControlClassNames,
  MultiSelectFieldControlProps,
} from '@components/fields';

/**
 * Компонент MultiSelectExtFieldControl - "Расширенный выпадающий список".
 * Выпадающий список может быть как с единичным выбором, так и с множественным (параметр multiple)
 * Отличие от обычного выпадающего списка в следующем:
 * - в качестве механизма выбора элемента списка используются чекбоксы
 * - добавлен параметр рендер-функция для отображения выбранного значения
 * - добавлен параметр рендер-функция для отображения элементов списка
 * - добавлены кнопки на поповере и соответствубщие параметры колбэки (Отмена, Выбрать)
 *
 * @param items Список элементов выпадающего списка
 * @param valueField Наименование поля для значения элемента списка по-умолчанию
 * @param labelField Наименование поля для отображения элемента списка по-умолчанию
 * @param renderValue Рендер-функция отображения выбраных элементов в инпуте
 * @param renderOption Рендер-функция отображения элемента выпадающего списка
 * @param classNameMenu Наименование класса поповера
 * @param autoPopoverWidth Автоопределение ширины поповера, если true, то ширина поповера равна ширине инпута
 * @param onSave Колбэк кнопки "Выбрать" на выпадающем списке
 * @param onCancel Колбэк кнопки "Отмена" на выпадающем списке
 * @param onClose Колбэк закрытия выпадающего списка
 * @param onChange Колбэк изменения значения
 */

export type MultiSelectExtFieldControlProps<ItemType> = Omit<
  MultiSelectFieldControlProps,
  'items' | 'renderValue' | 'onChange' | 'onClose'
> & {
  items?: ItemType[];
  valueField?: keyof ItemType;
  labelField?: keyof ItemType;
  renderValue?: (items: ItemType[]) => JSX.Element | string;
  renderOption?: (item: ItemType) => JSX.Element | string;
  classNameMenu?: string;
  autoPopoverWidth?: boolean;
  autoClose?: boolean;
  displaySelectedFirst?: boolean;
  displayCheckboxes?: boolean;
  displaySearch?: boolean;
  displayButtons?: boolean;
  onSave?: (value?: unknown[], name?: string) => void;
  onCancel?: (value?: unknown[], name?: string) => void;
  onClose?: (value?: unknown[], name?: string) => void;
  onChange?: (value?: unknown[], name?: string) => void;
  searchLabel?: string;
  cancelLabel?: string;
  clearLabel?: string;
  selectLabel?: string;
  selectAllLabel?: string;
};

export const MultiSelectExtFieldControl = <ItemType,>(
  props: MultiSelectExtFieldControlProps<ItemType>
) => {
  const { isEdit = true, loading, className, heightAuto, ...other } = props;

  const cls = fieldControlClassNames(
    props,
    'multi-select-ext-field-control multi-select-field-control select-field-control'
  );

  if (loading) {
    return <SkeletonFieldControl className={cls} />;
  } else if (isEdit) {
    return <MultiSelectExtFieldControlEdit className={cls} {...other} />;
  } else {
    return <MultiSelectExtFieldControlView className={cls} {...other} />;
  }
};
