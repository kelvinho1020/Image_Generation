import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components/common'
import { apiPostDalle, apiPostPost } from "../api";
import { useAlert } from 'react-alert'

const CreatePost = () => {
  const alert = useAlert();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  })
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await apiPostDalle({ prompt: form.prompt });
        const result = response.data;

        setForm({ ...form, photo: `data:image/jpeg;base64,${result.photo}`});
      } catch(err) {
        alert.show(err.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert.show('Please enter a Prompt!')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if(form.prompt && form.photo && form.name) {
      setLoading(true);
      try {
        await apiPostPost(form);
        alert.show("Share successfully!");
        
        navigate("/");
      } catch(err) {
        alert.show(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert.show('Please generate a image before share it with the community!')
    }
  }

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  function handleSurpriseMe() {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt: randomPrompt});
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">
          Create imaginative and visually stunning images through DALL-E AI and share them to the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Please enter your name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName="Prompt" 
            type="text" 
            name="prompt" 
            placeholder="teddy bears shopping for groceries in Japan, ukiyo-e"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            ) : (
              <img src={preview} alt="preview" className="w-9/12 h-9-12 object-contain opacity-40" />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
            <button 
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" 
              type="button" 
              onClick={generateImage}
            >
              {generatingImg ? "generating..." : "Generate"}
            </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with others in the community
          </p>
        </div>
        <button type="submit" className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          {loading ? "Sharing..." : "Share with the community"}
        </button>
      </form>
    </section>
  )
}

export default CreatePost