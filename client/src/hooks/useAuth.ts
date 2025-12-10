import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

function isProfileComplete(user: User | null | undefined): boolean {
  if (!user) return false;
  return !!(
    user.firstName &&
    user.lastName &&
    user.dateOfBirth &&
    user.phone &&
    user.address &&
    user.city &&
    user.state &&
    user.pincode &&
    user.occupation &&
    user.annualIncome
  );
}

export function useAuth() {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isProfileComplete: isProfileComplete(user),
  };
}
