import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { createBlog } from "../../services/blogService";
import { useNavigate } from "react-router-dom";
import { BlogInput } from "../../types/blog";
import { uploadImageToIPFS } from "../../services/ipfsService"; // IPFS upload service

const PRIMARY = "#1f528c";
const SECONDARY = "#3e6aa7";
const FONT_FAMILY = "'Inter', 'Roboto', sans-serif";

export default function CreateBlogPage() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState<string>("");
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // For preview (image only, but videos can be uploaded too)
  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setMedia(file);
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const submitBlog = async (isDraft: boolean) => {
    if (!accessToken || !user || user.role !== "admin") {
      setMessage("Only admins can create blogs.");
      return;
    }
    if (!isDraft && (!slug.trim() || !title.trim() || !content.trim())) {
      setMessage("Slug, title, and content cannot be empty.");
      return;
    }
    setLoading(true);
    setMessage(isDraft ? "Saving draft..." : "Publishing blog...");

    let media_cid: string | undefined;

    try {
      // ADD/CHANGE: Upload media to IPFS if present, and get the CID
      if (media) {
        setMessage("Uploading media to IPFS...");
        const cid = await uploadImageToIPFS(media, accessToken);
      }

      // ADD/CHANGE: Build payload, append media_cid if present
      const payload: BlogInput & { media_cid?: string } = {
        author_id: user.sub,
        title: title.trim(),
        slug: slug.trim(),
        content: content.trim(),
        status: isDraft ? "draft" : "published",
        published_at: new Date().toISOString(),
        ...(media_cid && { media_cid }), // only add if we have a cid
      };

      await createBlog(payload, accessToken);
      setMessage(isDraft ? "Draft saved!" : "Blog published!");
      setTimeout(() => navigate("/admin/blogs"), 1000);
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "Error submitting blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitBlog(false);
  };

  const handleSaveDraft = (e: FormEvent) => {
    e.preventDefault();
    submitBlog(true);
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6">
        <p className="text-red-600">Access denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
        minHeight: "100vh",
        fontFamily: FONT_FAMILY,
        padding: "40px 0",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          maxWidth: 500,
          margin: "0 auto",
          borderRadius: 16,
          boxShadow: "0 6px 24px rgba(31,82,140,0.1)",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          fontFamily: FONT_FAMILY,
        }}
      >
        <h2
          style={{
            color: PRIMARY,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Upload a New Blog
        </h2>

        <label style={{ fontWeight: 500 }}>
          Blog Title
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${SECONDARY}`,
              marginTop: 4,
              fontFamily: FONT_FAMILY,
            }}
          />
        </label>

        <label style={{ fontWeight: 500 }}>
          Slug
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. my-first-blog-post"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${SECONDARY}`,
              marginTop: 4,
              fontFamily: FONT_FAMILY,
            }}
          />
        </label>

        <label style={{ fontWeight: 500 }}>
          Content
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${SECONDARY}`,
              marginTop: 4,
              fontFamily: FONT_FAMILY,
              resize: "vertical",
            }}
          />
        </label>

        <label style={{ fontWeight: 500 }}>
          Blog Media (optional)
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            style={{ marginTop: 4 }}
          />
        </label>
        {preview && (
          <div style={{ textAlign: "center" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                borderRadius: 12,
                margin: "10px 0",
              }}
            />
          </div>
        )}

        <div style={{ display: "flex", gap: 16 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              cursor: loading ? "not-allowed" : "pointer",
              flex: 1,
              transition: "background 0.2s",
              fontFamily: FONT_FAMILY,
            }}
          >
            {loading && message === "Publishing blog..."
              ? "Publishing…"
              : "Upload Blog"}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSaveDraft}
            style={{
              background: "#f1f4f8",
              color: SECONDARY,
              fontWeight: 600,
              fontSize: 16,
              border: `1px solid ${SECONDARY}`,
              borderRadius: 8,
              padding: "12px 0",
              cursor: loading ? "not-allowed" : "pointer",
              flex: 1,
              transition: "background 0.2s",
              fontFamily: FONT_FAMILY,
            }}
          >
            {loading && message === "Saving draft..."
              ? "Saving…"
              : "Save as Draft"}
          </button>
        </div>

        {message && (
          <div style={{ textAlign: "center", color: SECONDARY }}>{message}</div>
        )}
      </form>
    </div>
  );
}
