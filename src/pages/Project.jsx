import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";

const Project = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/professions")
      .then((response) => {
        setProfessions(
          response.data.map((prof) => ({
            value: prof._id,
            label: prof.professionTitle,
          }))
        );
      })
      .catch((error) => console.error("Error fetching professions", error));
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/projects", {
        ...data,
        professions: data.professions.map((prof) => prof.value),
      });
      console.log(response.data);
      reset();
    } catch (error) {
      console.error("Error adding project", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border rounded-lg shadow-md w-full max-w-lg mx-auto"
    >
      <div>
        <label>Project Title</label>
        <input
          {...register("projectTitle", { required: true })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Project Description</label>
        <textarea
          {...register("projectDesc", { required: true })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Professions</label>
        <Controller
          name="professions"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={professions}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
            />
          )}
        />
      </div>

      <div>
        <label>Experience Level</label>
        <select {...register("experience")} className="border p-2 w-full">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label>Min Age Requirement</label>
        <input
          type="number"
          {...register("minAgeRequirement")}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Max Age Requirement</label>
        <input
          type="number"
          {...register("maxAgeRequirement")}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Project Status</label>
        <select {...register("projectStatus")} className="border p-2 w-full">
          <option value="0">Pending</option>
          <option value="1">Ongoing</option>
          <option value="2">Completed</option>
        </select>
      </div>

      <div>
        <label>Gender Preference</label>
        <select {...register("gender")} className="border p-2 w-full">
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
      >
        Add Project
      </button>
    </form>
  );
};

export default Project;
