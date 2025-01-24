export interface SectionTheme {
    id: string;
    theme: 'dark' | 'light';
  }
  
  //customize backgrounds
  export const sectionThemes: SectionTheme[] = [
    { id: 'home', theme: 'light' },      
    { id: 'about', theme: 'dark' },    
    { id: 'projects', theme: 'light' },  
    { id: 'skills', theme: 'dark' },    
    { id: 'contact', theme: 'light' },  
  ];