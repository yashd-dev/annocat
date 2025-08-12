import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';
import { useId } from 'react';

export function UploadButton({
  control: { upload, isPending },
  accept,
  metadata,
  uploadOverride
}) {
  const id = useId();

  return (
    <Button disabled={isPending} className="relative" type="button">
      <label htmlFor={id} className="absolute inset-0 cursor-pointer">
        <input
          id={id}
          className="absolute inset-0 size-0 opacity-0"
          type="file"
          accept={accept}
          onChange={(e) => {
            if (e.target.files?.[0] && !isPending) {
              if (uploadOverride) {
                uploadOverride(e.target.files[0], { metadata });
              } else {
                upload(e.target.files[0], { metadata });
              }
            }
            e.target.value = '';
          }} />
      </label>
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Upload file
        </>
      ) : (
        <>
          <Upload className="size-4" />
          Upload file
        </>
      )}
    </Button>
  );
}
