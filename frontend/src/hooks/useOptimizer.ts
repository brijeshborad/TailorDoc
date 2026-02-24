import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useOptimizer = () =>
    useMutation({
        mutationFn: async ({ resumeFile, jobDescription, hideContactDetails }: { resumeFile: File; jobDescription: string; hideContactDetails: boolean }) => {
            const form = new FormData();
            form.append("resume", resumeFile);
            form.append("job_description", jobDescription);
            form.append("hide_contact_details", hideContactDetails.toString());

            const res = await axios.post("http://127.0.0.1:8000/api/optimize", form, {
                timeout: 120000
            });

            return res.data.html;
        },
    });
