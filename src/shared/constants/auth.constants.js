export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =/^(?=(?:.*[A-Z]){2,})(?=(?:.*[a-z]){2,})(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  
export const passwordMessage ="Password must be at least 8 characters long and contain at least 2 uppercase letters, 2 lowercase letters, 1 number and 1 special character.";