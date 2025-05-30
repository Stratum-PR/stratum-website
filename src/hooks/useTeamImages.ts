
import { useState, useEffect } from 'react';

export const useTeamImages = () => {
  const [teamImages, setTeamImages] = useState<{ [key: string]: string }>({});

  // Load saved images from localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem('stratumTeamImages');
    if (savedImages) {
      setTeamImages(JSON.parse(savedImages));
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('stratumTeamImages', JSON.stringify(teamImages));
  }, [teamImages]);

  const handleImageUpload = (memberKey: string, imageData: string) => {
    setTeamImages(prev => ({
      ...prev,
      [memberKey]: imageData
    }));
  };

  const handleImageRemove = (memberKey: string) => {
    setTeamImages(prev => {
      const updated = { ...prev };
      delete updated[memberKey];
      return updated;
    });
  };

  return {
    teamImages,
    handleImageUpload,
    handleImageRemove
  };
};
