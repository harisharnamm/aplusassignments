"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Upload, FileText, AlertCircle, CheckCircle, Clock, MessageSquare } from "lucide-react"
import FAQSection from "@/components/faq-section"
import { cn } from "@/lib/utils"

// Define types for form data and response
interface FormData {
  subject: string;
  academicLevel: string;
  pageCount: string;
  deadline: Date | undefined;
  instructions: string;
  email: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
  referenceId: string;
  expectedResponseTime: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    academicLevel: "",
    pageCount: "",
    deadline: undefined,
    instructions: "",
    email: "",
  })
  const [referenceId, setReferenceId] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles([...files, ...newFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }
  
  const handleSelectChange = (id: string, value: string) => {
    setFormData({
      ...formData,
      [id]: value,
    })
  }
  
  const resetForm = () => {
    setFormData({
      subject: "",
      academicLevel: "",
      pageCount: "",
      deadline: undefined,
      instructions: "",
      email: "",
    })
    setDate(undefined)
    setErrorMessage("")
  }

  const validateForm = (): boolean => {
    // Check if at least one file is uploaded
    if (files.length === 0) {
      setErrorMessage("Please upload at least one file")
      return false
    }
    
    // Check total size of all files (max 50MB to avoid issues with webhook)
    let totalSize = 0;
    
    // Check file sizes and types
    for (const file of files) {
      totalSize += file.size;
      
      // Check individual file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) { // 10MB in bytes
        setErrorMessage(`File ${file.name} exceeds the maximum size of 10MB`)
        return false
      }
      
      // Check file type
      const fileType = file.name.split('.').pop()?.toLowerCase()
      if (!['pdf', 'doc', 'docx'].includes(fileType || '')) {
        setErrorMessage(`File ${file.name} is not an acceptable format. Please use PDF, DOC, or DOCX`)
        return false
      }
      
      // Check for zero byte files
      if (file.size === 0) {
        setErrorMessage(`File ${file.name} appears to be empty or corrupted`)
        return false
      }
    }
    
    // Check total upload size
    if (totalSize > 50 * 1024 * 1024) { // 50MB total limit
      setErrorMessage(`Total file size (${(totalSize / 1024 / 1024).toFixed(1)}MB) exceeds the maximum of 50MB. Please reduce the size or number of files.`)
      return false
    }
    
    // Check required fields
    if (!formData.subject) {
      setErrorMessage("Please select a subject")
      return false
    }
    
    if (!formData.academicLevel) {
      setErrorMessage("Please select an academic level")
      return false
    }
    
    if (!date) {
      setErrorMessage("Please select a deadline")
      return false
    }
    
    // Email validation
    if (!formData.email) {
      setErrorMessage("Please enter your email address")
      return false
    }
    
    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address")
      return false
    }
    
    return true
  }

  // Check if the browser is online
  const checkConnection = () => {
    if (!navigator.onLine) {
      return false;
    }
    return true;
  };

  // For development testing - retry mechanism and fallback mock response
  const useFallbackResponse = (refId: string, retryCount = 0): Promise<UploadResponse> => {
    console.log(`Using fallback/mock response after ${retryCount} retry attempts`);
    // This is a mock response for development and testing purposes only
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Assignment received successfully",
          referenceId: refId, // Use the provided reference ID
          expectedResponseTime: "within 1 hour"
        });
      }, 1000); // Simulate network delay
    });
  };

  // Generate a unique reference ID
  const generateReferenceId = (): string => {
    // Create a timestamp component in base 36
    const timestamp = Date.now().toString(36).toUpperCase();
    
    // Add a random component (4 characters)
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    // Combine with a prefix
    return `REQ-${timestamp}${randomPart}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    
    // Check internet connection
    if (!checkConnection()) {
      setErrorMessage("Please check your internet connection and try again.");
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    // Generate a unique reference ID before submission
    const submissionReferenceId = generateReferenceId();
    
    setUploadStatus("uploading")
    
    // Create FormData object for uploading files and form data
    const formDataToSend = new FormData()
    
    // Add files with logging to check upload progress
    let totalSize = 0;
    
    // Add each file with a more explicit name to help n8n recognize them as files
    files.forEach((file, index) => {
      // Use a consistent name pattern that n8n can identify
      const fieldName = `file${index}`;
      formDataToSend.append(fieldName, file, file.name);
      
      // Also add file metadata to help with debugging
      formDataToSend.append(`${fieldName}_name`, file.name);
      formDataToSend.append(`${fieldName}_type`, file.type);
      formDataToSend.append(`${fieldName}_size`, file.size.toString());
      
      totalSize += file.size;
      console.log(`Adding file ${index+1}/${files.length}: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB) as ${fieldName}`);
    })
    console.log(`Total upload size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Add form fields
    formDataToSend.append('subject', formData.subject)
    formDataToSend.append('academicLevel', formData.academicLevel)
    formDataToSend.append('pageCount', formData.pageCount)
    formDataToSend.append('deadline', date ? date.toISOString() : '')
    formDataToSend.append('instructions', formData.instructions)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('fileCount', files.length.toString())
    formDataToSend.append('referenceId', submissionReferenceId) // Add the reference ID to the form data
    
    // For tracking retry attempts
    let retryCount = 0;
    const maxRetries = 2;
    
    try {
      console.log('Preparing to send data to webhook...');
      
      // Log form data being sent (excluding file contents for brevity)
      console.log('Form data entries:', {
        referenceId: submissionReferenceId,
        subject: formData.subject,
        academicLevel: formData.academicLevel,
        pageCount: formData.pageCount,
        deadline: date ? date.toISOString() : '',
        email: formData.email,
        fileCount: files.length,
        fileNames: files.map(f => f.name)
      });
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      // Send data to n8n webhook with more robust error handling
      const response = await fetch('https://n8n.projectascend.in/webhook/82a38486-8ff1-417e-9fc7-387481bea1a1', {
        method: 'POST',
        body: formDataToSend,
        // Add headers to help with CORS issues
        headers: {
          // Don't set Content-Type when using FormData as it needs to include the boundary
          // Browser will set it automatically
          'Accept': 'application/json'
        },
        signal: controller.signal
      }).catch(networkErr => {
        console.error('Network error during fetch:', networkErr);
        // Clear timeout if there's an error
        clearTimeout(timeoutId);
        
        if (networkErr.name === 'AbortError') {
          throw new Error('Request timed out. The server took too long to respond.');
        }
        throw new Error(`Network error: ${networkErr.message || 'Unable to connect to the server. Please check your internet connection.'}`);
      });
      
      // Clear the timeout if fetch completes
      clearTimeout(timeoutId);
      
      console.log('Response received:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details available');
        console.error('Error response from server:', response.status, errorText);
        throw new Error(`Server error (${response.status}): ${errorText || response.statusText || 'Unknown error'}`);
      }
      
      // Check response content type
      const contentType = response.headers.get('content-type');
      console.log('Response content type:', contentType);
      
      // Safely parse JSON response
      let result: UploadResponse;
      
      try {
        // First try to get the text response so we can log it in case of JSON parsing errors
        const responseText = await response.text();
        console.log('Raw response text:', responseText.substring(0, 200) + (responseText.length > 200 ? '...' : ''));
        
        try {
          // Try to parse the text as JSON
          let parsedResponse;
          
          try {
            parsedResponse = JSON.parse(responseText);
            console.log('Parsed response:', parsedResponse);
            
            // Check if response is in the format from n8n (array with webhook data)
            if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
              // Handle n8n webhook format
              const webhookData = parsedResponse[0];
              console.log('Webhook data:', webhookData);
              
              // Use the reference ID we already generated and sent to n8n
              result = {
                success: true,
                message: "Assignment submitted successfully",
                referenceId: submissionReferenceId,
                expectedResponseTime: "within 1 hour"
              };
            } else if (parsedResponse && typeof parsedResponse === 'object') {
              // If it's already in our expected format, use as is
              result = parsedResponse as UploadResponse;
            } else {
              throw new Error('Unexpected response format');
            }
          } catch (jsonError) {
            console.error('Error processing JSON response:', jsonError);
            throw jsonError;
          }
          
          console.log('Response processed successfully:', result);
          
          if (result.success) {
            // Use our generated reference ID if none returned from the server
            const refId = result.referenceId || submissionReferenceId;
            setUploadStatus("success");
            setReferenceId(refId);
            console.log('Form submitted successfully with ID:', refId);
            
            // Reset form after successful submission
            setFiles([]);
            resetForm();
          } else {
            throw new Error(result.message || "The server reported an error with your submission");
          }
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          
          // If we got a successful status code but invalid JSON, consider it a partial success
          if (response.status >= 200 && response.status < 300) {
            console.log('Request seems successful despite JSON parsing error');
            setUploadStatus("success");
            setReferenceId(submissionReferenceId); // Use the reference ID we generated and sent
            
            // Reset form after submission
            setFiles([]);
            resetForm();
          } else {
            throw new Error('Invalid response from server. Please try again later.');
          }
        }
      } catch (parseError) {
        console.error('Error processing response:', parseError);
        throw new Error('Could not process server response. Please try again later.');
      }
    } catch (error) {
      console.error('Error uploading assignment:', error);
      
      // Check if we should retry
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(`Retry attempt ${retryCount} of ${maxRetries}...`);
        setErrorMessage(`Connection issue. Retrying (${retryCount}/${maxRetries})...`);
        
        // Wait a moment before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Try again with the same form data
        try {
          const response = await fetch('https://n8n.projectascend.in/webhook/82a38486-8ff1-417e-9fc7-387481bea1a1', {
            method: 'POST',
            body: formDataToSend,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            try {
              const result = await response.json();
              setUploadStatus("success");
              setReferenceId(result.referenceId || submissionReferenceId);
              setFiles([]);
              resetForm();
              return;
            } catch (e) {
              console.error('Error parsing retry response:', e);
            }
          }
        } catch (retryError) {
          console.error('Retry also failed:', retryError);
        }
      }
      
      // If retries failed or we're out of retries, try the fallback in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Using development fallback response after failure');
        try {
          // Pass the reference ID to our fallback function
          const mockResult = await useFallbackResponse(submissionReferenceId, retryCount);
          setUploadStatus("success");
          setReferenceId(mockResult.referenceId);
          setFiles([]);
          resetForm();
          return;
        } catch (fallbackError) {
          console.error('Even fallback failed:', fallbackError);
        }
      }
      
      // If all else fails, show error
      setUploadStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to upload your assignment. Please try again.");
    }
  }

  const faqs = [
    {
      question: "What file formats do you accept?",
      answer:
        "We accept PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, and TXT files. If you have a different file format, please contact our support team.",
    },
    {
      question: "How quickly will I receive a quote?",
      answer:
        "You'll receive a quote within 1 hour of submitting your assignment. For complex assignments, it may take up to 2 hours.",
    },
    {
      question: "What information should I include with my assignment?",
      answer:
        "Please include your assignment instructions, deadline, academic level, and any specific requirements or grading rubrics. The more details you provide, the better we can meet your expectations.",
    },
    {
      question: "Is my assignment information confidential?",
      answer:
        "Absolutely. We have strict confidentiality policies in place. Your personal information and assignment details are never shared with third parties.",
    },
  ]

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-2">Upload Your Assignment</h1>
              <p className="text-muted-foreground">
                Get a free quote within 1 hour and take the first step toward academic success.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md border p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* File Upload Section */}
                <div className="mb-8">
                  <Label className="text-base font-medium mb-2 block">Upload Your Files</Label>
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                      isDragging
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                        : "border-gray-200 dark:border-gray-800",
                      "hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30",
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-10 w-10 text-indigo-500" />
                      <p className="font-medium">Drag and drop your files here or click to browse</p>
                      <p className="text-sm text-muted-foreground">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        multiple
                        accept=".pdf,.doc,.docx"
                      />
                    </div>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-indigo-500" />
                            <span className="text-sm truncate max-w-[200px] md:max-w-md">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Remove file</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Assignment Details Form */}
                <div className="space-y-6">
                  {/* Error Message Display */}
                  {errorMessage && (
                    <div className="bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200 p-3 rounded-md border border-red-200 dark:border-red-800 flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <p>{errorMessage}</p>
                    </div>
                  )}
              
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject/Course</Label>
                      <Select 
                        value={formData.subject}
                        onValueChange={(value) => handleSelectChange("subject", value)}
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="humanities">Humanities</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="medicine">Medicine</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="social-sciences">Social Sciences</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="academicLevel">Academic Level</Label>
                      <Select
                        value={formData.academicLevel}
                        onValueChange={(value) => handleSelectChange("academicLevel", value)}
                      >
                        <SelectTrigger id="academicLevel">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="undergraduate">Undergraduate</SelectItem>
                          <SelectItem value="masters">Masters</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pageCount">Number of Pages/Word Count</Label>
                      <Input 
                        id="pageCount" 
                        type="number" 
                        placeholder="e.g., 5 pages or 1500 words"
                        value={formData.pageCount}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select deadline"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar 
                            mode="single" 
                            selected={date} 
                            onSelect={(selectedDate) => {
                              setDate(selectedDate)
                              setFormData({
                                ...formData,
                                deadline: selectedDate
                              })
                            }}
                            initialFocus 
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email for quote delivery"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Enter any specific requirements, grading rubrics, or additional information"
                      className="min-h-[120px]"
                      value={formData.instructions}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Success message with reference ID */}
                  {uploadStatus === "success" && referenceId && (
                    <div className="bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 p-4 rounded-md border border-green-200 dark:border-green-800 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium">Your assignment was uploaded successfully!</h3>
                      </div>
                      <p>We've received your assignment and will review it shortly. Your reference ID is:</p>
                      <div className="font-mono bg-white dark:bg-gray-900 p-2 rounded border text-center text-lg">
                        {referenceId}
                      </div>
                      <p className="text-sm mt-2">Please save this reference ID for future communication.</p>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      disabled={uploadStatus === "uploading" || uploadStatus === "success"}
                    >
                      {uploadStatus === "idle" && "Get My Quote"}
                      {uploadStatus === "uploading" && (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Uploading Assignment...
                        </>
                      )}
                      {uploadStatus === "success" && (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" /> Quote Requested
                        </>
                      )}
                      {uploadStatus === "error" && (
                        <>
                          <AlertCircle className="mr-2 h-4 w-4" /> Error - Try Again
                        </>
                      )}
                    </Button>
                    
                    {uploadStatus === "success" && (
                      <Button
                        type="button"
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => {
                          setUploadStatus("idle");
                          setReferenceId("");
                        }}
                      >
                        Submit Another Assignment
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <Link href="#" className="text-indigo-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-indigo-600 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-poppins text-2xl md:text-3xl font-bold mb-2">What Happens Next?</h2>
              <p className="text-muted-foreground">Here's what you can expect after submitting your assignment.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-poppins text-lg font-semibold mb-2">Quick Response</h3>
                <p className="text-muted-foreground text-sm">
                  You'll receive a personalized quote within 1 hour of submitting your assignment.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-poppins text-lg font-semibold mb-2">Expert Matching</h3>
                <p className="text-muted-foreground text-sm">
                  We'll match you with a subject expert who specializes in your specific topic.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-poppins text-lg font-semibold mb-2">Quality Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Once confirmed, we'll deliver your completed assignment before your deadline.
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">Need urgent assistance? Contact us directly:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  (123) 456-7890
                </Button>
                <Button variant="outline" className="gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  support@assignmentace.com
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={faqs}
        title="Frequently Asked Questions About Uploads"
        description="Find answers to common questions about our upload process and assignment handling."
      />
    </>
  )
}
