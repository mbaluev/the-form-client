import { useEffect, useState } from 'react';
import { IContentItemProps } from '@components/content';
import throttle from 'lodash/fp/throttle';

interface IItemClient {
  id: string;
  node: HTMLElement;
}

const getItemsClient = (items: IContentItemProps[]) => {
  return items.map(({ id }) => {
    return { id, node: document.getElementById(id) } as IItemClient;
  });
};

const useScrollSpy = (items: IContentItemProps[], offset?: number) => {
  let itemsClient: IItemClient[] = [];
  const [active, setActive] = useState<string>('');

  const handle = throttle(100, () => {
    let currentSectionId = itemsClient[0].id;
    for (const itemClient of itemsClient) {
      const { id, node } = itemClient;
      if (!node || !(node instanceof Element)) continue;
      if (node.getBoundingClientRect().top - (offset || 0) - 1 < 0) {
        currentSectionId = id;
        continue;
      }
      break;
    }
    setActive(currentSectionId);
  });

  useEffect(() => {
    itemsClient = getItemsClient(items);
    handle();
    window.addEventListener('scroll', handle);
    return () => {
      window.removeEventListener('scroll', handle);
    };
  }, [itemsClient, offset]);

  return { active, setActive };
};

export default useScrollSpy;
