'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Select, Button } from '@/components/ui';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  form: {
    name: string;
    phone: string;
    email: string;
    projectType: string;
    projectTypes: { value: string; label: string }[];
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm({ form }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('https://api.nazarenkoarchitect.ru/send.php', {
        method: 'POST',
        body: new URLSearchParams(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', projectType: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          label={form.name}
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label={form.phone}
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          label={form.email}
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <Select
          label={form.projectType}
          name="projectType"
          required
          options={form.projectTypes}
          value={formData.projectType}
          onChange={handleChange}
        />
      </div>

      <Input
        label={form.message}
        name="message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        rows={6}
      />

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === 'sending'}
          className="min-w-[200px]"
        >
          {status === 'sending' ? (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <Send size={18} className="animate-pulse" />
              {form.sending}
            </motion.span>
          ) : (
            <span className="flex items-center gap-2">
              <Send size={18} />
              {form.submit}
            </span>
          )}
        </Button>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-green-600"
          >
            <CheckCircle size={20} />
            <span className="text-sm">{form.success}</span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-red-600"
          >
            <AlertCircle size={20} />
            <span className="text-sm">{form.error}</span>
          </motion.div>
        )}
      </div>
    </motion.form>
  );
}
