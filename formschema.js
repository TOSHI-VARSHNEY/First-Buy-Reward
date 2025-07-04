const formSchema = [
    {
      type: "text", // Field type
      name: "firstName", // Unique identifier for the field
      label: "First Name", // Label to display
      placeholder: "Enter your first name", // Placeholder text
      required: true, // Whether the field is required
      validation: {
        minLength: 2, // Minimum length of the input
        maxLength: 50, // Maximum length of the input
        pattern: /^[A-Za-z]+$/i, // Regex pattern for validation
        patternMessage: "Only alphabets are allowed", // Custom error message for pattern
      },
      defaultValue: "", // Default value for the field
      disabled: false, // Whether the field is disabled
      hidden: false, // Whether the field is hidden
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
      validation: {
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Email regex
        patternMessage: "Invalid email address",
      },
      defaultValue: "",
      disabled: false,
      hidden: false,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
      validation: {
        minLength: 8,
        maxLength: 20,
        pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, // Password complexity
        patternMessage:
          "Password must contain at least one uppercase letter, one number, and one special character",
      },
      defaultValue: "",
      disabled: false,
      hidden: false,
    },
    {
      type: "select",
      name: "country",
      label: "Country",
      required: true,
      options: [
        { value: "", label: "Select a country" }, // Default option
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "uk", label: "United Kingdom" },
      ],
      defaultValue: "",
      disabled: false,
      hidden: false,
    },
    {
      type: "radio",
      name: "gender",
      label: "Gender",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      defaultValue: "",
      disabled: false,
      hidden: false,
    },
    {
      type: "checkbox",
      name: "terms",
      label: "I agree to the terms and conditions",
      required: true,
      defaultValue: false,
      disabled: false,
      hidden: false,
    },
    {
      type: "date",
      name: "dob",
      label: "Date of Birth",
      required: true,
      validation: {
        min: "1900-01-01", // Minimum date
        max: new Date().toISOString().split("T")[0], // Maximum date (today)
      },
      defaultValue: "",
      disabled: false,
      hidden: false,
    },
    {
      type: "textarea",
      name: "bio",
      label: "Bio",
      placeholder: "Tell us about yourself",
      required: false,
      validation: {
        maxLength: 500, // Maximum character limit
      },
      defaultValue: "",
      disabled: false,
      hidden: false,
    },
    {
      type: "file",
      name: "profilePicture",
      label: "Profile Picture",
      required: false,
      validation: {
        accept: "image/*", // Accept only image files
        maxSize: 5 * 1024 * 1024, // 5MB file size limit
      },
      defaultValue: null,
      disabled: false,
      hidden: false,
    },
    {
      type: "conditional", // Conditional field
      name: "showAdditionalInfo",
      label: "Do you want to provide additional information?",
      required: false,
      defaultValue: false,
      fields: [
        {
          type: "text",
          name: "additionalInfo",
          label: "Additional Information",
          placeholder: "Enter additional information",
          required: false,
          validation: {
            maxLength: 200,
          },
          defaultValue: "",
          disabled: false,
          hidden: false,
        },
      ],
    },
  ];



  const response = {
    "status": "success",
    "data": {
      "input": {
        "company_url": "www.fb.com",
        "country": "US",
        "date": "12-03-2023"
      },
    }
  }


  // Define the FormField type
type ValidationRules = {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
};

type FormField = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  validation?: ValidationRules;
  defaultValue?: string;
  disabled?: boolean;
  hidden?: boolean;
};

// Sample API response
const response = {
  status: "success",
  data: {
    input: {
      company_url: "www.fb.com",
      country: "US",
      date: "12-03-2023",
    },
  },
};

// Function to generate form schema dynamically
const generateFormSchema = (inputData: Record<string, string>): FormField[] => {
  return Object.keys(inputData).map((key) => {
    let fieldType = "text"; // Default to text field

    // Determine field type based on key name
    if (key.includes("url")) fieldType = "url";
    if (key.includes("date")) fieldType = "date";
    if (key.includes("email")) fieldType = "email";

    return {
      type: fieldType,
      name: key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()), // Convert to readable label
      placeholder: `Enter ${key.replace(/_/g, " ")}`,
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100,
        pattern: fieldType === "text" ? /^[A-Za-z\s]+$/i : undefined, // Pattern only for text
        patternMessage: fieldType === "text" ? "Only alphabets are allowed" : undefined,
      },
      defaultValue: inputData[key],
      disabled: false,
      hidden: false,
    };
  });
};

// Generate schema
const formSchema: FormField[] = generateFormSchema(response.data.input);

// Output Schema
console.log(formSchema);
