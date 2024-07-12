import React from "react";

const Form = ({ setValue, handleSubmit, value }) => {
  // App.js -> handleChange
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex pt-2">
        <input
          type="text"
          name="value"
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
          placeholder="해야 할 일을 입력하세요."
          value={value}
          onChange={handleChange}
        />

        {/* hover : 마우스 갖다댔을 때 */}
        <input
          className="p-2 text-pink-200 border-2 border-pink-200 rounded hover:text-white hover:bg-pink-200"
          type="submit"
          value="입력"
        />
      </form>
    </div>
  );
};

export default Form;
