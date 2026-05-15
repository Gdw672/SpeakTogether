import axios from "axios";
import type { CreateLessonDTO } from "../CreateLessonDTO";
import type { Lesson } from "../Lesson";

export const lessonApi = {
    create: async (
        data: CreateLessonDTO,
        token: string
    ): Promise<Lesson> => {
        try {
            const response = await axios.post(
                "https://localhost:7173/lesson/create-with-materials-dto",
                {
                    name: data.name,
                    description: data.description,
                    startDate: new Date(data.startDate).toISOString(),
                    endDate: new Date(data.endDate).toISOString(),
                    language: data.language,
                    langLevel: data.langLevel
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            return response.data;
        } catch (error: any) {
            console.error("❌ CREATE LESSON ERROR");
            console.error("Status:", error.response?.status);
            console.error("Data:", error.response?.data);

            throw error;
        }
    },

    addMaterials: async (
        data: LessonMaterialDTO,
        token: string
    ) => {
        try {
            const formData = new FormData();

            formData.append("lessonId", String(data.lessonId));

            data.files.forEach((file) => {
                formData.append("files", file);
            });

            data.links.forEach((link) => {
                formData.append("links", link);
            });

            const response = await axios.post(
                "https://localhost:7173/lesson/add-materials-to-lesson",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            return response.data;
        } catch (error: any) {
            console.error("❌ ADD MATERIALS ERROR");
            console.error(error.response?.data);

            throw error;
        }
    },
    getLessons: async (
        token: string
    ): Promise<Lesson[]> => {
        try {
            const response = await axios.get(
                "https://localhost:7173/lesson/get-lessons",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch (error: any) {
            console.error("❌ GET LESSONS ERROR");
            console.error("Status:", error.response?.status);
            console.error("Data:", error.response?.data);

            throw error;
        }
    }
};

export type LessonMaterialDTO = {
    lessonId: number;

    files: File[];

    links: string[];
};