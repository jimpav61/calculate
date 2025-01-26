interface CompanyInformationProps {
  formData: {
    name: string;
    companyName: string;
    email: string;
    phone: string;
    website: string;
  };
}

export const CompanyInformation = ({ formData }: CompanyInformationProps) => {
  return (
    <div className="space-y-2 md:space-y-3">
      <h3 className="text-lg md:text-xl font-semibold text-brand">Company Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <div>
          <p className="text-xs md:text-sm text-brand">Contact Name</p>
          <p className="text-sm md:text-base font-medium">{formData.name}</p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-brand">Company</p>
          <p className="text-sm md:text-base font-medium">{formData.companyName}</p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-brand">Email</p>
          <p className="text-sm md:text-base font-medium break-all">{formData.email}</p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-brand">Phone</p>
          <p className="text-sm md:text-base font-medium">{formData.phone}</p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-brand">Website</p>
          <p className="text-sm md:text-base font-medium break-all">
            {formData.website ? (
              <a 
                href={formData.website.startsWith('http') ? formData.website : `https://${formData.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {formData.website}
              </a>
            ) : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};