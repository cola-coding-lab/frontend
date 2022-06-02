import { Url } from "url";

export interface Step {
    id: string;
    title: string;
    description: string;
    image: Url[];
}