import { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";

type formDataType = {
  name: string;
  email: string;
  comment: string;
  storeData: boolean;
};

const CommentsForm: React.FC<{ slug: string }> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [localStorage, setLocalStorage] = useState<any>(null);
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    email: "",
    comment: "",
    storeData: false,
  });

  //side effect untuk mengecek locale storage----------
  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormDataState = {
      name: window.localStorage.getItem("name")!,
      email: window.localStorage.getItem("email")!,
      comment: "",
      storeData: Boolean(
        window.localStorage.getItem("name") ||
          window.localStorage.getItem("email")
      ),
    };
    setFormData(initialFormDataState);
  }, []);

  //side effect untuk timer error and success notification---
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }

    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [error, success]);

  //change input handler-------------------------------------
  const changeInputHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { target } = e;

    if (target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [target.name]: (target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  //submit form handler--------------------------------------
  const submitFormHandler = () => {
    setError(false);

    const { name, email, comment, storeData } = formData;

    if (
      !name ||
      name.trim().length === 0 ||
      !email ||
      !email.includes("@") ||
      email.trim().length === 0 ||
      !comment ||
      comment.trim().length === 0
    ) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    //send data...
    submitComment(commentObj)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white p-8 pb-12 mb-8 rounded-lg">
      <h3 className="font-bold pb-4 border-b border-slate-300 mb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 mb-4">
        <textarea
          name="comment"
          id="comment"
          cols={30}
          placeholder="Comment"
          className="bg-gray-100 w-full p-4 focus:ring-2 focus:ring-blue-400 outline-none"
          value={formData.comment}
          onChange={changeInputHandler}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-100 w-full p-4 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Name"
          value={formData.name}
          onChange={changeInputHandler}
        />
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-100 w-full p-4 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Email"
          value={formData.email}
          onChange={changeInputHandler}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="storeData"
            id="storeData"
            value="true"
            checked={formData.storeData}
            onChange={changeInputHandler}
          />
          <label
            htmlFor="storeData"
            className="text-xs cursor-pointer select-none"
          >
            Save my name and email for the next time I post a comment
          </label>
        </div>
      </div>
      {error && (
        <h6 className="text-xs text-red-600 my-2">
          All input fields must be filled
        </h6>
      )}
      <div>
        <button
          type="button"
          className="bg-blue-600 text-white py-3 px-8 rounded-lg transition duration-300 hover:bg-opacity-90 hover:shadow-lg active:scale-95"
          onClick={submitFormHandler}
        >
          Submit Comment
        </button>
        {success && (
          <h6 className="text-xs text-green-600 my-2">
            Thank you for the feedback!, Comment submitted for review
          </h6>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
