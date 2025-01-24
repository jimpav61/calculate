import { useProspectEmail } from "./useProspectEmail";

// Test sending a report
const testProspect = {
  id: "test-id",
  client_name: "Test Client",
  company_name: "Test Company",
  email: "jimmy.pavlatos@gmail.com", // Using the logged-in user's email for testing
  phone: "123-456-7890",
  minutes: 1000,
  cost_per_minute: 0.5,
  created_at: new Date().toISOString(),
};

const { sendReport } = useProspectEmail();
sendReport(testProspect, 0.75); // Testing with a new cost per minute of 0.75