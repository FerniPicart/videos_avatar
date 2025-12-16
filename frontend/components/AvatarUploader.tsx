type Props = {
  onUpload: (file: File) => void;
};

export default function AvatarUploader({ onUpload }: Props) {
    return (
        <div>
            <h3>Avatar</h3>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        onUpload(e.target.files[0]);
                    }
                }}
            />
        </div>
    );
}
