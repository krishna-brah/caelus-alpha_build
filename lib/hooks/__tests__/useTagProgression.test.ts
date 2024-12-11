import { renderHook, act } from '@testing-library/react-hooks';
import { useTagProgression } from '../useTagProgression';
import { AppProvider } from '../../contexts/AppContext';
import { Tag } from '../../../types/tags';

// Mock data
const mockTag: Tag = {
  id: '1',
  category: 'FabricSpecialty',
  value: 'Denim',
  tier: 'Baseline',
  projectsCompleted: 8,
  nextTierThreshold: 10,
};

const mockMetrics = {
  consumerRating: 4.5,
  designerRating: 4.8,
  engagement: 150,
};

describe('useTagProgression', () => {
  it('should update tag progress when metrics meet thresholds', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useTagProgression(), { wrapper });

    await act(async () => {
      const update = await result.current.updateTagProgress(mockTag.id, mockMetrics);
      expect(update).toBeTruthy();
      expect(update?.tag.projectsCompleted).toBe(9);
      expect(update?.progress).toBe(90); // 9/10 * 100
    });
  });

  it('should not update progress when metrics are below thresholds', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useTagProgression(), { wrapper });

    const lowMetrics = {
      consumerRating: 3.5,
      designerRating: 3.8,
      engagement: 50,
    };

    await act(async () => {
      const update = await result.current.updateTagProgress(mockTag.id, lowMetrics);
      expect(update).toBeTruthy();
      expect(update?.tag.projectsCompleted).toBe(8); // Unchanged
      expect(update?.progress).toBe(80); // 8/10 * 100
    });
  });

  it('should upgrade tier when threshold is reached', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useTagProgression(), { wrapper });

    const almostGoldTag: Tag = {
      ...mockTag,
      projectsCompleted: 9,
    };

    await act(async () => {
      const update = await result.current.updateTagProgress(almostGoldTag.id, mockMetrics);
      expect(update).toBeTruthy();
      expect(update?.tag.tier).toBe('Gold');
      expect(update?.tag.nextTierThreshold).toBe(25);
      expect(update?.progress).toBe(40); // 10/25 * 100
    });
  });
});