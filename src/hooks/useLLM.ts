import { useState } from 'react';
import { llmService } from '@/services/api';
import { LLMProvider, CodeGeneration } from '@/types/llm';
import { useToast } from '@/components/ui/use-toast';

export const useLLM = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState<LLMProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const { toast } = useToast();

  const generateCode = async (prompt: string): Promise<CodeGeneration | null> => {
    setIsLoading(true);
    try {
      const result = await llmService.generateCode(prompt);
      toast({
        title: "Code Generated",
        description: "Your code has been generated successfully.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate code. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const loadProviders = async () => {
    try {
      const availableProviders = await llmService.getProviders();
      setProviders(availableProviders);
      if (availableProviders.length > 0) {
        setSelectedProvider(availableProviders[0].id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load LLM providers.",
        variant: "destructive",
      });
    }
  };

  return {
    generateCode,
    loadProviders,
    providers,
    selectedProvider,
    setSelectedProvider,
    isLoading,
  };
};