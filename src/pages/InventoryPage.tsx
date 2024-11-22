import { useState } from 'react';
import { InventoryCategory } from '../types.ts';
import { AccessoriesInventory } from '../components/AccessoriesInventory.tsx';
import { ComponentsInventory } from '../components/ComponentsInventory.tsx';
import { Cursor } from '../components/Cursor.tsx';
import { ItemsInventory } from '../components/ItemsInventory.tsx';
import { KeyItemsInventory } from '../components/KeyItemsInventory.tsx';
import { WeaponsInventory } from '../components/WeaponsInventory.tsx';
import styles from './InventoryPage.module.css';
import pageAnimations from './page-animations.module.css';

interface InventoryPageProps {
  setHelpHeaderText: Function;
};

export function InventoryPage({ setHelpHeaderText }: InventoryPageProps) {
  const [activeCategory, setActiveCategory] = useState<InventoryCategory>('Items');
  const categoriesMap: { [key in InventoryCategory]: { headerText: string } } = {
    'Items': { headerText: 'View consumable items in the party inventory.' },
    'Weapons': { headerText: 'View weapons in the party inventory.' },
    'Accessories': { headerText: 'View accessories in the party inventory.' },
    'Components': { headerText: 'View components in the party inventory.' },
    'Key Items': { headerText: 'View key items in the party inventory.' }
  };

  function renderInventoryCategory(category: InventoryCategory) {
    const categoriesMap: { [key in InventoryCategory]: JSX.Element } = {
      'Items': <ItemsInventory setHelpHeaderText={setHelpHeaderText} />,
      'Weapons': <WeaponsInventory setHelpHeaderText={setHelpHeaderText} />,
      'Accessories': <AccessoriesInventory />,
      'Components': <ComponentsInventory />,
      'Key Items': <KeyItemsInventory />
    };
    return categoriesMap[category];
  }

  return (
    <div className={styles['page']}>
      <div className={`${styles['categories-container']} ${pageAnimations['fade-in-from-left']}`}>
        <div className={`${styles['ruler-title']} ${styles['end']} outlined`}>
          Inventory
        </div>
        <div className={`${styles['ruler']} outlined`} />
        <ul className={styles['categories']}>
          {Object.entries(categoriesMap).map(([category, { headerText }]) => (
            <li
              key={category}
              className={`${styles['category']} ${activeCategory === category ? styles['active'] : ''}`}
              onClick={() => setActiveCategory(category as InventoryCategory)}
              onMouseEnter={() => setHelpHeaderText(headerText)}
              onMouseLeave={() => setHelpHeaderText(categoriesMap[activeCategory].headerText)}
            >
              <Cursor className={styles['category-cursor']} animated={activeCategory === category} />
              <span className="outlined">{category}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={pageAnimations['fade-in-from-right']}>
        {renderInventoryCategory(activeCategory)}
      </div>
    </div>
  );
}
