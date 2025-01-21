interface CompanyInformationProps {
  formData: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
  };
}

export const CompanyInformation = ({ formData }: CompanyInformationProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Company Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Contact Name</p>
          <p className="font-medium">{formData.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Company</p>
          <p className="font-medium">{formData.companyName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{formData.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{formData.phone}</p>
        </div>
      </div>
    </div>
  );
};