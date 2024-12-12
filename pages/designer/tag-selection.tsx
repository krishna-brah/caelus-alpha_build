import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { TagSelection } from '../../components/TagSelection';
import { useToast } from '../../components/ui/toast';
import type { Tag } from '@/lib/config/tags';

const DesignerTagSelection: NextPage = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const handleSubmit = async (selectedTags: Tag[]) => {
    try {
      const response = await fetch('/api/designer/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: selectedTags }),
      });

      if (!response.ok) {
        throw new Error('Failed to save tags');
      }

      addToast({
        title: 'Tags Saved Successfully',
        message: 'Your specializations have been updated.',
        type: 'success',
      });

      // Redirect to dashboard after successful submission
      router.push('/designer/dashboard');
    } catch (error) {
      console.error('Error saving tags:', error);
      addToast({
        title: 'Error Saving Tags',
        message: 'There was a problem saving your specializations. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <TagSelection
      maxSelections={5}
      onSubmit={handleSubmit}
      initialTags={[]}
    />
  );
};

export default DesignerTagSelection;