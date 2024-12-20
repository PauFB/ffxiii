import { useEffect, useState } from 'react';
import { Item } from '../types.ts';
import { Cursor } from './Cursor.tsx';
import styles from '../pages/InventoryPage.module.css';

interface ItemsInventoryProps {
  setHelpHeaderText: Function;
}

export function ItemsInventory({ setHelpHeaderText }: ItemsInventoryProps) {
  const [items, setItems] = useState<{ [key: string]: Item }>({});
  const [selectedItemKey, setSelectedItemKey] = useState<string>();

  useEffect(() => {
    import('../data/itemsData.ts').then(itemsModule => setItems(itemsModule.itemsData));
  }, []);

  function handleOnClickItem(event: React.MouseEvent<HTMLTableCellElement>) {
    const selectedItemName = (event.target as HTMLTableCellElement).textContent?.trim();
    if (selectedItemName) {
      setSelectedItemKey(selectedItemName);
      setHelpHeaderText(items[selectedItemName].effect);
    }
  }

  return (
    <div className={styles['table-container']}>
      <div className={`${styles['ruler-title']} ${styles['start']} outlined`}>
        Inventory
      </div>
      <div className={`${styles['ruler']} outlined`} />
      <table className={styles['table']}>
        <colgroup>
          <col />
          <col style={{ width: '2.5rem' }} />
          <col />
          <col style={{ width: '2.5rem' }} />
        </colgroup>
        <thead>
          <tr className={styles['table-header-row']}>
            <th><div className={styles['item-column-name']}>Item</div></th>
            <th><div className={styles['quantity-column-name']}>Quantity</div></th>
            <th />
            <th><div className={styles['quantity-column-name']}>Quantity</div></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([itemName, _], index) => {
            const nextItemName = Object.keys(items)[index + 1];
            if (index % 2 === 0) {
              return (
                <tr className={styles['table-row']} key={itemName + nextItemName}>
                  <td onClick={handleOnClickItem}>
                    <div className={`${styles['item-name']} ${selectedItemKey === itemName ? styles['active'] : ''}`}>
                      <img className={styles['item-icon']} src={''} alt="" />
                      <Cursor className={styles['item-cursor']} animated={selectedItemKey === itemName} />
                      {itemName}
                    </div>
                  </td>
                  <td>
                    <div className={styles['item-quantity']}>
                      01
                    </div>
                  </td>
                  <td onClick={handleOnClickItem}>
                    <div className={`${styles['item-name']} ${selectedItemKey === nextItemName ? styles["active"] : ""}`}>
                      <img className={styles['item-icon']} src={""} alt="" />
                      <Cursor className={styles['item-cursor']} animated={selectedItemKey === nextItemName} />
                      {nextItemName}
                    </div>
                  </td>
                  <td>
                    <div className={styles['item-quantity']}>
                      {nextItemName ? '01' : ''}
                    </div>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
