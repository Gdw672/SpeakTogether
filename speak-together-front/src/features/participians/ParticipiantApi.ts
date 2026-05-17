const BASE_URL = "https://localhost:7173";

const getToken = () => localStorage.getItem("token");

export const participantApi = {
    enroll: async (lessonId: number) => {
        const token = getToken();

        const res = await fetch(
            `${BASE_URL}/Participian/add-participian-to-lesson?LessonId=${lessonId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error(await res.text());
        }

        return res.json().catch(() => null);
    },
};