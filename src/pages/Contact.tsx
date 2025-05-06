import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHero } from "@/components/PageHero";

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Basic XSS protection - sanitize input
    const sanitizedValue = value.replace(/<[^>]*>?/gm, '');
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  // Form submission handler with security considerations
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Basic validation with meaningful error messages
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !validateEmail(formData.email),
      message: !formData.message.trim()
    };
    
    setFormErrors(errors);
    
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here we would normally send data to a secure API endpoint
      // For demonstration, we simulate an API call with timeout
      
      // Security note: In a real implementation, we would:
      // 1. Use HTTPS for data transmission
      // 2. Implement CSRF protection
      // 3. Rate limit submissions to prevent abuse
      // 4. Implement server-side validation
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: language === 'da' ? 'Besked sendt!' : 'Message sent!',
        description: language === 'da' 
          ? 'Tak for din henvendelse. Vi vender tilbage hurtigst muligt.'
          : 'Thank you for your message. We will get back to you as soon as possible.',
      });
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      // Handle errors
      toast({
        title: language === 'da' ? 'Der opstod en fejl' : 'An error occurred',
        description: language === 'da' 
          ? 'Vi kunne ikke sende din besked. Prøv igen senere.'
          : 'We could not send your message. Please try again later.',
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Email validation helper
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Text content based on language
  const content = {
    page: {
      title: language === 'da' ? 'Kontakt os' : 'Contact us',
      subtitle: language === 'da' 
        ? 'Har du spørgsmål eller vil du samarbejde? Kontakt os her.'
        : 'Got questions or want to collaborate? Get in touch here.',
      form: {
        name: language === 'da' ? 'Navn' : 'Name',
        email: language === 'da' ? 'Email' : 'Email',
        message: language === 'da' ? 'Besked' : 'Message',
        namePlaceholder: language === 'da' ? 'Indtast dit navn' : 'Enter your name',
        emailPlaceholder: language === 'da' ? 'Indtast din email' : 'Enter your email',
        messagePlaceholder: language === 'da' ? 'Skriv din besked her...' : 'Type your message here...',
        submit: language === 'da' ? 'Send besked' : 'Send message',
        required: language === 'da' ? 'Påkrævet' : 'Required',
        invalidEmail: language === 'da' ? 'Ugyldig email adresse' : 'Invalid email address'
      },
      connect: {
        title: language === 'da' ? 'Følg os' : 'Follow us',
        socials: language === 'da' ? 'Find os på sociale medier' : 'Find us on social media',
        info: language === 'da' ? 'Kontaktoplysninger' : 'Contact Information'
      }
    },
    title: language === 'da' ? 'Kontakt' : 'Contact',
    description: language === 'da'
      ? 'Har du spørgsmål eller vil du i kontakt med os? Vi står klar til at hjælpe.'
      : 'Do you have questions or want to get in touch? We are ready to help.'
  };

  return (
    <Layout>
      <PageHero title={content.title} description={content.description} />
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form with Security Considerations */}
            <div className="animate-slide-up">
              <h2 className="text-2xl font-semibold mb-6">{language === 'da' ? 'Skriv til os' : 'Write to us'}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {content.page.form.name} 
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder={content.page.form.namePlaceholder}
                    className={formErrors.name ? 'border-red-500' : ''}
                    maxLength={100} // Restrict input length for security
                    autoComplete="name" // Enhance user experience
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm">{content.page.form.required}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {content.page.form.email}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder={content.page.form.emailPlaceholder}
                    className={formErrors.email ? 'border-red-500' : ''}
                    maxLength={100}
                    autoComplete="email"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">
                      {formData.email.trim() === '' 
                        ? content.page.form.required 
                        : content.page.form.invalidEmail}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">
                    {content.page.form.message}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder={content.page.form.messagePlaceholder}
                    rows={5}
                    className={formErrors.message ? 'border-red-500' : ''}
                    maxLength={2000}
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-sm">{content.page.form.required}</p>
                  )}
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? 
                    (language === 'da' ? 'Sender...' : 'Sending...') : 
                    content.page.form.submit}
                </Button>
              </form>
            </div>
            
            {/* Contact Details */}
            <div className="animate-slide-up">
              <h2 className="text-2xl font-semibold mb-6">{content.page.connect.info}</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a href="mailto:contact@teamsea.org" className="text-primary hover:underline">
                        contact@teamsea.org
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">{language === 'da' ? 'Telefon' : 'Phone'}</h3>
                      <a href="tel:+4512345678" className="text-primary hover:underline">
                        +45 12 34 56 78
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">{content.page.connect.socials}</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://facebook.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                      </svg>
                    </a>
                    <a 
                      href="https://tiktok.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                      aria-label="TikTok"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
