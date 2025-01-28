import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";

interface ContactInfoStepProps {
  formData: {
    phone: string;
    email: string;
    website: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactInfoStep = ({ formData, onChange }: ContactInfoStepProps) => {
  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters except plus sign
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // If no country code is present, add +1 (US)
    let withCountryCode = cleaned;
    if (!cleaned.startsWith('+')) {
      withCountryCode = '+1' + cleaned;
    }
    
    // Format as +X XXX XXX XXXX (international format)
    const match = withCountryCode.match(/^\+(\d{1,3})?(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const [, countryCode, areaCode, middle, last] = match;
      const parts = [
        countryCode ? `+${countryCode}` : '',
        areaCode ? ` ${areaCode}` : '',
        middle ? ` ${middle}` : '',
        last ? ` ${last}` : ''
      ].filter(Boolean);
      
      return parts.join('');
    }
    return withCountryCode;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    onChange({
      ...e,
      target: {
        ...e.target,
        name: 'phone',
        value: formattedValue,
      },
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handlePhoneChange}
          className="mt-1"
          placeholder="+1 234 567 8900"
          required
        />
        <p className="text-sm text-muted-foreground mt-1">
          Format: +[country code] [area code] [local number] (e.g., +1 234 567 8900)
        </p>
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          className="mt-1"
          required
        />
      </div>
      <div>
        <Label htmlFor="website">Website URL</Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={onChange}
          className="mt-1"
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
};