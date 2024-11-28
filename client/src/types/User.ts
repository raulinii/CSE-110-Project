export interface User {
    id?: string; 
    Email: string; 
    Password: string; 
    Username: string;
    familiarity: "Beginner" | "Casual" | "Regular";     
    time_choice_one: "Short" | "Median" | "Long";
    time_choice_two: "Short" | "Median" | "Long"; 
    time_choice_three: "Short" | "Median" | "Long"; 
}
