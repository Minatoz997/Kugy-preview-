import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/HomeSelect.module.css';

interface HomeSelectProps {
  onSelect?: (option: string) => void;
}

const HomeSelect: React.FC<HomeSelectProps> = ({ onSelect }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }

    // Add navigation logic here if needed
    switch (option) {
      case 'chat':
        router.push('/chat');
        break;
      case 'settings':
        router.push('/settings');
        break;
      case 'profile':
        router.push('/profile');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to MyKugy AI</h2>
      
      <div className={styles.optionsGrid}>
        <button 
          className={`${styles.option} ${selectedOption === 'chat' ? styles.selected : ''}`}
          onClick={() => handleOptionSelect('chat')}
        >
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>💬</span>
          </div>
          <span className={styles.label}>Start Chat</span>
        </button>

        <button 
          className={`${styles.option} ${selectedOption === 'settings' ? styles.selected : ''}`}
          onClick={() => handleOptionSelect('settings')}
        >
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>⚙️</span>
          </div>
          <span className={styles.label}>Settings</span>
        </button>

        <button 
          className={`${styles.option} ${selectedOption === 'profile' ? styles.selected : ''}`}
          onClick={() => handleOptionSelect('profile')}
        >
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>👤</span>
          </div>
          <span className={styles.label}>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default HomeSelect;