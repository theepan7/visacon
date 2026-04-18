interface ImageValidationResult {
  isValid: boolean;
  error?: string;
  dimensions?: { width: number; height: number };
}

export const validatePhotoImage = async (
  file: File
): Promise<ImageValidationResult> => {
  // Check file type
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    return { isValid: false, error: 'Only JPG/PNG images allowed' };
  }

  // Check file size (max 1MB)
  if (file.size > 1024 * 1024) {
    return { isValid: false, error: 'Image must be under 1MB' };
  }

  // Check dimensions (must be square 1:1)
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        const aspectRatio = width / height;

        // Allow 1:1 ratio with small tolerance
        if (Math.abs(aspectRatio - 1) > 0.05) {
          resolve({
            isValid: false,
            error: 'Photo must be square (1:1 ratio)',
            dimensions: { width, height },
          });
        } else if (width < 200 || height < 200) {
          resolve({
            isValid: false,
            error: 'Minimum resolution: 200x200 pixels',
            dimensions: { width, height },
          });
        } else {
          resolve({
            isValid: true,
            dimensions: { width, height },
          });
        }
      };
      img.onerror = () => {
        resolve({ isValid: false, error: 'Failed to load image' });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const validatePassportBio = async (
  file: File
): Promise<ImageValidationResult> => {
  // Accept PDF or image
  const validTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ];
  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only PDF or image files allowed for passport bio',
    };
  }

  // Check file size (max 5MB for PDF)
  if (file.size > 5 * 1024 * 1024) {
    return { isValid: false, error: 'File must be under 5MB' };
  }

  return { isValid: true };
};
