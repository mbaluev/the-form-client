import React from 'react';
import {
  fieldControlClassNames,
  MultiSelectExtFieldControl,
  MultiSelectExtFieldControlProps,
} from '@components/fields';
import { Tags, Tag } from '../../tag';

export type TagFieldControlProps<ItemType> = Omit<
  MultiSelectExtFieldControlProps<ItemType>,
  'renderOption' | 'renderValue'
> & {
  countField?: keyof ItemType;
  limitTags?: number;
};

export const TagFieldControl = <ItemType,>(
  props: TagFieldControlProps<ItemType>
) => {
  const {
    valueField = 'value' as keyof ItemType,
    labelField = 'label' as keyof ItemType,
    countField = 'count' as keyof ItemType,
    items,
    displayCheckboxes,
    limitTags,
    className,
    heightAuto,
    isEdit = true,
    ...other
  } = props;

  const cls = fieldControlClassNames(props, 'tag-field-control');

  const renderOption = (item: ItemType) => {
    return (
      <div className="tag-field-control__option">
        <Tag tag={item[labelField]} />
        <div className="tag-field-control__option-count">
          {item[countField]}
        </div>
      </div>
    );
  };
  const renderValue = (selItems: ItemType[]) => {
    const limit = isEdit ? limitTags : undefined;
    return (
      <Tags>
        {selItems
          .filter((_, index) => (limit ? index < limit : true))
          .map((item, index) => {
            return <Tag key={index} tag={item[labelField]} />;
          })}
        {limit && selItems.length > limit && (
          <div className="tag-field-control__tags-more">
            +{selItems.length - limit}
          </div>
        )}
      </Tags>
    );
  };

  return (
    <MultiSelectExtFieldControl
      className={cls}
      classNameMenu="tag-field-control__menu"
      items={items}
      valueField={valueField}
      labelField={labelField}
      renderOption={renderOption}
      renderValue={renderValue}
      displayCheckboxes={false}
      displaySelectedFirst={true}
      isEdit={isEdit}
      {...other}
    />
  );
};
