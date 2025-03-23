import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  onChange: (files: FileList | null) => void;
  error?: string;
  multiple?: boolean;
  accept?: string;
  required?: boolean;
  name?: string;
  value?: File[];
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onChange,
  error,
  multiple = false,
  accept = "image/*",
  required = false,
  name = "",
  value = [],
  className = "",
}) => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (value && value.length > 0) {
      console.log("values", value);
      setFiles(value);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);
    setFiles(fileArray);
    onChange(selectedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    // Create a new FileList to send to onChange
    const dt = new DataTransfer();
    updatedFiles.forEach((file) => dt.items.add(file));
    onChange(updatedFiles.length > 0 ? dt.files : null);
  };

  return (
    <div className="w-full space-y-2">
      {label && <Label className="block text-sm font-medium">{label}</Label>}

      <label
        className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer transition ${
          error ? "border-red-500" : "border-gray-300 hover:border-blue-500"
        }`}
      >
        <input
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleFileChange}
        />
        {files.length > 0 ? (
          <div className="w-full space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-10 h-10 rounded object-cover"
                  />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "flex flex-col items-center align-middle text-gray-500",
              className
            )}
          >
            <UploadCloud size={24} />
            <span className="text-sm">Click to upload files</span>
          </div>
        )}
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
