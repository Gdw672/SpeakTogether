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
            console.error("Headers:", error.response?.headers);

            console.log("❌ VALIDATION ERRORS:");
            console.dir(error.response?.data?.errors, { depth: null });

            throw error;
        }
    },
};