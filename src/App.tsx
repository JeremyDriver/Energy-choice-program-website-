import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Upload, 
  Play, 
  Maximize2, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Copy, 
  Check, 
  Sparkles, 
  FileCode, 
  RotateCcw,
  Eye,
  FileText
} from 'lucide-react';

const STARTER_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to My Website</title>
  <style>
    :root {
      --primary: #4f46e5;
      --bg: #0f172a;
      --card-bg: rgba(30, 41, 59, 0.7);
      --text: #f8fafc;
      --muted: #94a3b8;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      background: radial-gradient(circle at top right, #1e1b4b, #0f172a);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px);
      border-radius: 1.25rem;
      padding: 3rem 2.5rem;
      max-width: 600px;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
    }
    .badge {
      display: inline-block;
      padding: 0.35rem 0.85rem;
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #a5b4fc;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    h1 {
      font-size: 2.25rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      color: var(--muted);
      line-height: 1.6;
      font-size: 1.05rem;
      margin-bottom: 2rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #4f46e5;
      color: white;
      text-decoration: none;
      font-weight: 600;
      padding: 0.85rem 1.75rem;
      border-radius: 0.75rem;
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
      font-size: 1rem;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
    }
    .btn:hover {
      background: #4338ca;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(79, 70, 229, 0.6);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Website Preview Ready</div>
    <h1>Your Custom HTML Website</h1>
    <p>Upload your .html file or paste your code to preview and deploy your website instantly.</p>
    <button class="btn" onclick="alert('Ready to upload your code!')">Explore Features</button>
  </div>
</body>
</html>`;

export default function App() {
  const [htmlCode, setHtmlCode] = useState<string>(() => {
    return localStorage.getItem('custom_html_code') || STARTER_TEMPLATE;
  });
  const [activeTab, setActiveTab] = useState<'split' | 'preview' | 'code'>('split');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('custom_html_code', htmlCode);
  }, [htmlCode]);

  const handleFileUpload = (file: File) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setHtmlCode(content);
        setActiveTab('split');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHtmlCode(STARTER_TEMPLATE);
    setFileName(null);
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Top Banner / Navigation */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-sm tracking-tight text-white">HTML Web Space</h1>
              {fileName && (
                <span className="text-xs bg-slate-800 text-indigo-400 px-2 py-0.5 rounded border border-slate-700">
                  {fileName}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Ready for your HTML code upload & live preview</p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Code Editor
          </button>
          <button
            onClick={() => setActiveTab('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'split'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Split View
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Full Preview
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Responsive device buttons (active when preview is visible) */}
          {activeTab !== 'code' && (
            <div className="flex items-center gap-0.5 bg-slate-800/70 p-1 rounded-lg border border-slate-700/70 mr-2">
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop view"
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewport === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                title="Tablet view (768px)"
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewport === 'tablet' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="Mobile view (390px)"
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewport === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            accept=".html,.htm,.txt"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload .html File
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
            title="Copy HTML to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg border border-slate-700 transition-colors"
            title="Reset to starter sample"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Upload Callout Bar for user guidance */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 border-b border-indigo-500/20 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 animate-pulse" />
          <span>
            <strong className="text-white font-medium">Ready for your HTML:</strong> You can paste your HTML directly into the chat prompt, upload a file here, or paste it into the editor below!
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400 text-xs">
          <span>Live rendering active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>
      </div>

      {/* Main Workspace */}
      <div 
        className="flex-1 flex overflow-hidden relative"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {/* Drag Overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-50 bg-indigo-950/90 border-2 border-dashed border-indigo-400 flex flex-col items-center justify-center backdrop-blur-sm">
            <Upload className="w-12 h-12 text-indigo-300 animate-bounce mb-3" />
            <p className="text-lg font-semibold text-white">Drop your .html file here</p>
            <p className="text-xs text-indigo-200 mt-1">We will load and preview your site instantly</p>
          </div>
        )}

        {/* Code Editor Panel */}
        {(activeTab === 'code' || activeTab === 'split') && (
          <div className={`flex flex-col border-r border-slate-800 bg-slate-950 ${
            activeTab === 'split' ? 'w-1/2' : 'w-full'
          }`}>
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/70 border-b border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                HTML Source Code
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {htmlCode.length} characters
              </span>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                placeholder="<!-- Paste your HTML code here or drop an HTML file... -->"
                spellCheck={false}
                className="w-full h-full p-4 bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/50 selection:bg-indigo-500/30 border-0"
              />
            </div>
          </div>
        )}

        {/* Live Preview Panel */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div className={`flex flex-col bg-slate-900/40 ${
            activeTab === 'split' ? 'w-1/2' : 'w-full'
          } items-center justify-start overflow-hidden`}>
            {/* Preview header */}
            <div className="w-full flex items-center justify-between px-4 py-2 bg-slate-900/70 border-b border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono">
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                Live Browser Output
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {viewport === 'desktop' ? 'Responsive 100%' : viewport === 'tablet' ? '768px' : '390px'}
              </span>
            </div>

            {/* iFrame Container */}
            <div className="flex-1 w-full flex items-center justify-center p-3 bg-slate-950/70 overflow-auto">
              <div className={`h-full transition-all duration-300 ease-out shadow-2xl rounded-lg overflow-hidden border border-slate-800 bg-white ${getViewportWidth()}`}>
                <iframe
                  title="Website Preview"
                  srcDoc={htmlCode}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
