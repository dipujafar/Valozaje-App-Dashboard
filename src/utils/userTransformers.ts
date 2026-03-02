/**
 * Utility functions for transforming user data from API responses
 */

const BASE_URL = process.env.NEXT_PUBLIC_FILE_URL || "http://localhost:3033";

/**
 * Transforms user image path to full URL
 * @param imagePath - The image path from API
 * @param fallback - Fallback image if path is empty
 * @returns Full image URL or fallback
 */
export const getUserImageUrl = (
  imagePath: string | undefined | null,
  fallback: string = "/user_image.png",
): string => {
  return imagePath ? `${BASE_URL}${imagePath}` : fallback;
};

/**
 * Transforms a single user object for table display
 * @param user - User object from API
 * @param index - Index in the array (for serial number calculation)
 * @param page - Current page number
 * @param limit - Items per page
 * @returns Transformed user data for table
 */
export const transformUserForTable = (
  user: any,
  index: number,
  page: number = 1,
  limit: number = 10,
) => {
  return {
    key: user._id,
    serial: (page - 1) * limit + index + 1,
    _id: user._id,
    name: user.fullName || user.email,
    image: getUserImageUrl(user.image),
    earned: user.totalEarned || 0,
    commission: user.dueCommission || 0,
    vehicle: user.vehicle || null,
    due: user.dueCommission || 0,
    trip: user.tripCount || 0,
    travel: user.totalSpent || 0,
    rating: user.averageRating || null,
  };
};

/**
 * Transforms multiple users for table display
 * @param users - Array of user objects from API
 * @param page - Current page number
 * @param limit - Items per page
 * @returns Array of transformed user data
 */
export const transformUsersForTable = (
  users: any[],
  page: number = 1,
  limit: number = 10,
) => {
  return users.map((user, index) =>
    transformUserForTable(user, index, page, limit),
  );
};

/**
 * Transforms a single user object for detailed view
 * @param user - User object from API
 * @returns Transformed user data for profile/details display
 */
export const transformUserForDetails = (user: any) => {
  return {
    name: user.fullName || user.email || "N/A",
    balance: user.due || 0,
    rating: user.averageRating || 0,
    avatarUrl: getUserImageUrl(user.image),
    stats: {
      trips: user.tripCount || 0,
      packages: (user.packageDelivered || 0) + (user.packageSent || 0),
      travel: user.travelCount || 0,
      claim: 0, // Not provided in API response
    },
    fullName: user.fullName || "N/A",
    email: user.email || "N/A",
    phone: user.phone || "N/A",
    address: user.address || "N/A",
    dob: user.dateOfBirth
      ? new Date(user.dateOfBirth).toLocaleDateString()
      : "N/A",
    due: user.due || 0,
    about: user.about || "",
    username: user.username || "N/A",
    roles: user.roles || [],
    emailVerified: user.emailVerified || false,
    isActive: user.isActive || false,
    isLocked: user.isLocked || false,
    driverVerified: user.driverVerified || false,
  };
};

/**
 * Formats vehicle information for display
 * @param vehicle - Vehicle object from API
 * @returns Formatted vehicle string or "N/A"
 */
export const formatVehicleInfo = (vehicle: any): string => {
  if (!vehicle) return "N/A";
  if (typeof vehicle === "object") {
    const vehicleText = `${vehicle.brand || ""} ${
      vehicle.vehicleModel || vehicle.vehicleType || ""
    }`.trim();
    return vehicleText || "N/A";
  }
  return vehicle;
};
