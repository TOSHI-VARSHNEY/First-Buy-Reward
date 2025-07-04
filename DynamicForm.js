// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// // Generate Yup validation schema dynamically
// const generateValidationSchema = (schema) => {
//   const validationSchema = {};
//   schema.forEach((field) => {
//     if (field.required) {
//       validationSchema[field.name] = yup
//         .string()
//         .required(`${field.label} is required`);
//       if (field.validation) {
//         if (field.validation.minLength) {
//           validationSchema[field.name] = validationSchema[field.name].min(
//             field.validation.minLength,
//             `${field.label} must be at least ${field.validation.minLength} characters`
//           );
//         }
//         if (field.validation.pattern) {
//           validationSchema[field.name] = validationSchema[field.name].matches(
//             field.validation.pattern,
//             field.validation.patternMessage || "Invalid input"
//           );
//         }
//       }
//     }
//   });
//   return yup.object().shape(validationSchema);
// };

// const DynamicForm = ({ schema }) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(generateValidationSchema(schema)),
//   });

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//   };

//   const renderField = (field) => {
//     switch (field.type) {
//       case "text":
//       case "email":
//       case "password":
//       case "date":
//       case "textarea":
//         return (
//           <input
//             {...field}
//             type={field.type}
//             placeholder={field.placeholder}
//             disabled={field.disabled}
//           />
//         );
//       case "select":
//         return (
//           <select {...field} disabled={field.disabled}>
//             {field.options.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         );
//       case "file":
//         return <input type="file" {...field} disabled={field.disabled} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {schema.map((field) => (
//         <div key={field.name}>
//           <label>{field.label}</label>
//           <Controller
//             name={field.name}
//             control={control}
//             defaultValue={field.defaultValue}
//             render={({ field: controllerField }) => renderField({ ...field, ...controllerField })}
//           />
//           {errors[field.name] && <p>{errors[field.name].message}</p>}
//         </div>
//       ))}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default DynamicForm;


import React, { useState } from "react";
import * as yup from "yup";

// Generate Yup validation schema dynamically
const generateValidationSchema = (schema) => {
  const validationSchema = {};
  schema.forEach((field) => {
    if (field.required) {
      validationSchema[field.name] = yup.string().required(`${field.label} is required`);
      if (field.validation) {
        if (field.validation.minLength) {
          validationSchema[field.name] = validationSchema[field.name].min(
            field.validation.minLength,
            `${field.label} must be at least ${field.validation.minLength} characters`
          );
        }
        if (field.validation.pattern) {
          validationSchema[field.name] = validationSchema[field.name].matches(
            field.validation.pattern,
            field.validation.patternMessage || "Invalid input"
          );
        }
      }
    }
  });
  return yup.object().shape(validationSchema);
};

const DynamicForm = ({ schema }) => {
  const [formData, setFormData] = useState(
    schema.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }), {})
  );
  const [errors, setErrors] = useState({});

  const validationSchema = generateValidationSchema(schema);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted:", formData);
      setErrors({});
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "date":
      case "textarea":
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            disabled={field.disabled}
            onChange={handleChange}
          />
        );
      case "select":
        return (
          <select name={field.name} value={formData[field.name]} disabled={field.disabled} onChange={handleChange}>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "file":
        return <input type="file" name={field.name} disabled={field.disabled} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          {renderField(field)}
          {errors[field.name] && <p style={{ color: "red" }}>{errors[field.name]}</p>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
