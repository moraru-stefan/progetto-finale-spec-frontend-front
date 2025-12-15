// THIS FILE IS AUTO-GENERATED from types.ts - DO NOT EDIT DIRECTLY
import z from 'zod';


// Schema generated from types.ts Smartphone type
export const SmartphoneSchema = z.object({
  id: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  title: z.string({ required_error: "Title is required" }),
  category: z.string({ required_error: "Category is required" }),
  brand: z.string(),
  price: z.number(),
  os: z.string(),
  screenSize: z.string(),
  ram: z.string(),
  storage: z.string(),
  imageUrl: z.string(),
}).strict(); // Add strict mode to reject extra properties


export function validateSmartphone(data) {
  try {
    const result = SmartphoneSchema.parse(data);
    return { valid: true, data: result };
  } catch (error) {
    return { 
      valid: false, 
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    };
  }
}

// Export all validators as a map for dynamic usage
export const validators = {
  "smartphone": validateSmartphone
};

// Export readonly properties for each type to prevent updates
export const readonlyProperties = {
  "smartphone": []
};
