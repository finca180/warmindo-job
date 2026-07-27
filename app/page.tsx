'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  MessageSquare,
  Bell,
  Calendar,
  Video,
  FileText,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Send,
  Sparkles,
  AlertCircle,
  X,
  Plus,
  Filter,
  Search,
  Check,
  Phone,
  MapPin,
  Award,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
  Info,
  Mic,
  Camera,
  Wifi,
  Smile,
  ThumbsUp,
  RotateCcw,
  Sliders,
  Store,
  Layers,
  ArrowUpRight
} from 'lucide-react';

// Initial Mock Data
const INITIAL_BRANCHES = [
  {
    id: 'BR-001',
    name: 'Warmindo Sutorejo',
    address: 'Jl. Raya Sutorejo No. 45, Mulyorejo, Surabaya',
    contact: '0812-3456-7890',
    employeeCount: 8,
    manager: 'Mas Masrukhan'
  },
  {
    id: 'BR-002',
    name: 'Warmindo Dago Kampus',
    address: 'Jl. Ir. H. Juanda No. 112, Coblong, Bandung',
    contact: '0819-8765-4321',
    employeeCount: 10,
    manager: 'Mbak Dewi'
  },
  {
    id: 'BR-003',
    name: 'Warmindo Malioboro',
    address: 'Jl. Malioboro No. 88, Danurejan, Yogyakarta',
    contact: '0821-1122-3344',
    employeeCount: 6,
    manager: 'Pak Joko'
  },
  {
    id: 'BR-004',
    name: 'Warmindo Jatinangor',
    address: 'Jl. Raya Bandung-Sumedang Km. 21, Jatinangor',
    contact: '0857-4455-6677',
    employeeCount: 7,
    manager: 'Kang Asep'
  }
];

const INITIAL_JOBS = [
  {
    id: 'JOB-101',
    branchId: 'BR-001',
    branchName: 'Warmindo Sutorejo',
    position: 'Juru Masak & Racik Indomie',
    category: 'Kitchen',
    headcount: 2,
    ageCriteria: '18 - 28 tahun',
    eduCriteria: 'SMA/SMK Sederajat',
    scheduleCriteria: 'Shift Siang & Malam (Full-time)',
    status: 'open',
    period: '01 Aug 2026 - 30 Aug 2026',
    description: 'Memasak sajian kreasi Indomie, meracik bumbu rahasia Warmindo, menjaga kebersihan kitchen set, serta mengelola stok bahan mentah harian.'
  },
  {
    id: 'JOB-102',
    branchId: 'BR-002',
    branchName: 'Warmindo Dago Kampus',
    position: 'Kasir & Pramusaji',
    category: 'Front-of-House',
    headcount: 3,
    ageCriteria: '18 - 25 tahun',
    eduCriteria: 'SMA/SMK / Mahasiswa Active',
    scheduleCriteria: 'Shift Fleksibel (Part-time / Full-time)',
    status: 'open',
    period: '05 Aug 2026 - 25 Aug 2026',
    description: 'Melayani pemesanan pelanggan dengan ramah, mengoperasikan sistem POS digital, menyajikan makanan/minuman, dan menjaga kenyamanan area makan.'
  },
  {
    id: 'JOB-103',
    branchId: 'BR-003',
    branchName: 'Warmindo Malioboro',
    position: 'Penanggung Jawab Shift (Shift Leader)',
    category: 'Management',
    headcount: 1,
    ageCriteria: '22 - 32 tahun',
    eduCriteria: 'D3/S1 Semua Jurusan',
    scheduleCriteria: 'Shift Rotasi',
    status: 'open',
    period: '10 Aug 2026 - 31 Aug 2026',
    description: 'Mengawasi jalannya operasional shift, menangani laporan keuangan harian kasir, memimpin briefing tim, serta memastikan standar mutu masakan.'
  }
];

const INITIAL_CANDIDATE_PROFILE = {
  id: 'CAND-8812',
  name: 'Budi Santoso',
  nik: '3578011204980003',
  education: 'SMK Tata Boga',
  gender: 'Laki-Laki',
  phone: '0813-9988-7766',
  email: 'budi.santoso2026@gmail.com',
  address: 'Jl. Mulyosari Selatan No. 12, Surabaya',
  experience: '1.5 tahun sebagai Asisten Koki di Depot Makan Sederhana, berpengalaman meracik bumbu dan mengelola pesanan cepat.'
};

const SCREENING_QUESTIONS = [
  'Halo! Selamat datang di proses seleksi Warmindo. Bisakah Anda menceritakan pengalaman kerja terakhir Anda di bidang F&B / kuliner?',
  'Terima kasih! Warmindo membutuhkan ketahanan fisik dan kecepatan saat jam sibuk. Bagaimana cara Anda menjaga stamina dan fokus saat antrean tinggi?',
  'Apakah Anda bersedia bekerja dengan sistem shift (termasuk shift malam hingga jam 01:00) dan di hari libur nasional?',
  'Pertanyaan terakhir: Jika terjadi komplain dari pelanggan tentang pesanan yang salah, langkah pertama apa yang akan Anda lakukan?'
];

export default function App() {
  // Role context: 'owner' (Pemilik Usaha) or 'candidate' (Calon Kandidat)
  const [role, setRole] = useState('candidate');

  // Candidate Navigation Pages: 'jobs', 'screening', 'stages', 'notifications', 'chat', 'video_guide', 'contract', 'profile'
  // Owner Navigation Pages: 'owner_dash', 'owner_candidates', 'owner_jobs', 'owner_branches', 'owner_chat', 'owner_placement'
  const [activeTab, setActiveTab] = useState('jobs');

  // Data Collections
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [candidateProfile, setCandidateProfile] = useState(INITIAL_CANDIDATE_PROFILE);

  // Application State
  const [appliedJob, setAppliedJob] = useState(INITIAL_JOBS[0]);
  const [hasApplied, setHasApplied] = useState(true);
  const [selectionStage, setSelectionStage] = useState(2); // 1: Melamar, 2: Screening AI, 3: Wawancara, 4: Kontrak, 5: Placed

  // UU PDP Consent Modal
  const [showPdpModal, setShowPdpModal] = useState(false);
  const [selectedJobToApply, setSelectedJobToApply] = useState(null);
  const [pdpConsentChecked, setPdpConsentChecked] = useState(false);

  // AI Chatbot Screening State
  const [screeningMessages, setScreeningMessages] = useState([
    {
      sender: 'bot',
      text: 'Selamat datang di Warmindo AI Screening System! Saya asisten virtual yang akan mengajukan beberapa pertanyaan awal. Apakah Anda siap untuk memulai?',
      time: '10:00 WIB'
    }
  ]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [screeningAnswerInput, setScreeningAnswerInput] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [screeningCompleted, setScreeningCompleted] = useState(false);

  // Interview Schedule Confirmation Workflow State
  // State 1: Proposed by owner | State 2: Reschedule slot picking | State 3: Pending owner approval | State 4: Schedule approved
  const [interviewState, setInterviewState] = useState(1);
  const [selectedRescheduleSlot, setSelectedRescheduleSlot] = useState('');
  const [proposedInterviewDate, setProposedInterviewDate] = useState('Kamis, 13 Agustus 2026 (10:00 - 10:30 WIB)');

  // Chat Conversations (Between Candidate & Owner)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'm1',
      sender: 'owner',
      text: 'Halo Mas Budi, selamat atas kelulusan screening AI Warmindo! Kami ingin mengundang Anda untuk sesi Wawancara Tatap Muka / Online.',
      time: '11:15 WIB'
    },
    {
      id: 'm2',
      sender: 'owner',
      isScheduleCard: true,
      scheduleDate: 'Kamis, 13 Agustus 2026 (10:00 - 10:30 WIB)',
      status: 'Proposisi Pemilik',
      time: '11:16 WIB'
    }
  ]);
  const [chatInputText, setChatInputText] = useState('');

  // Owner Chat Action Quick Replies
  const [quickReplyChips] = useState([
    'Jadwal tidak tersedia di jam tersebut.',
    'Bisa tolong ajukan waktu alternatif sore hari?',
    'Mohon hadir tepat waktu dengan membawa KTP.',
    'Lokasi wawancara di Warmindo Sutorejo Lt. 2.'
  ]);

  // PKWT Contract Finalization State
  const [contractData, setContractData] = useState({
    id: 'PKWT-WMD/2026/088',
    candidateName: INITIAL_CANDIDATE_PROFILE.name,
    nik: INITIAL_CANDIDATE_PROFILE.nik,
    position: 'Juru Masak & Racik Indomie',
    branchName: 'Warmindo Sutorejo',
    duration: '6 Bulan (15 Agustus 2026 - 15 Februari 2027)',
    salary: 'Rp 2.850.000 / Bulan + Uang Makan',
    probation: '1 Bulan',
    status: 'Drafting' // 'Drafting', 'Confirmed'
  });
  const [showContractConfirmModal, setShowContractConfirmModal] = useState(false);

  // Video Guidance Modal / Room State
  const [inVideoRoom, setInVideoRoom] = useState(false);
  const [videoChecklist, setVideoChecklist] = useState({
    camera: false,
    mic: false,
    network: false,
    environment: false
  });

  // Notifications List
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Undangan Wawancara Kerja',
      desc: 'Pemilik Warmindo Sutorejo telah menjadwalkan wawancara untuk posisi Juru Masak.',
      timestamp: '10 menit lalu',
      unread: true,
      type: 'interview'
    },
    {
      id: 'n2',
      title: 'Hasil AI Screening Selesai',
      desc: 'Skor Kesesuaian Anda adalah 92% (Sangat Sesuai dengan Kriteria).',
      timestamp: '1 jam lalu',
      unread: true,
      type: 'screening'
    },
    {
      id: 'n3',
      title: 'Informasi Hak & Kewajiban Kerja',
      desc: 'Silakan pelajari dokumen UU Ketenagakerjaan & Tata Tertib Warmindo.',
      timestamp: '1 hari lalu',
      unread: false,
      type: 'info'
    }
  ]);

  // Candidates list for Owner Review
  const [candidatesList, setCandidatesList] = useState([
    {
      id: 'CAND-8812',
      name: 'Budi Santoso',
      position: 'Juru Masak & Racik Indomie',
      branch: 'Warmindo Sutorejo',
      education: 'SMK Tata Boga',
      matchScore: 92,
      recommendation: 'Sangat Direkomendasikan',
      status: 'Proses Wawancara',
      appliedDate: '08 Aug 2026',
      screeningScore: '4/4 Pertanyaan Tepat'
    },
    {
      id: 'CAND-8813',
      name: 'Siti Rahmawati',
      position: 'Kasir & Pramusaji',
      branch: 'Warmindo Dago Kampus',
      education: 'SMA Negeri 1 Bandung',
      matchScore: 85,
      recommendation: 'Direkomendasikan',
      status: 'Screening AI',
      appliedDate: '09 Aug 2026',
      screeningScore: '3/4 Pertanyaan Tepat'
    },
    {
      id: 'CAND-8814',
      name: 'Rizky Pratama',
      position: 'Juru Masak & Racik Indomie',
      branch: 'Warmindo Sutorejo',
      education: 'SMA Swasta',
      matchScore: 68,
      recommendation: 'Perlu Pertimbangan',
      status: 'Baru Melamar',
      appliedDate: '10 Aug 2026',
      screeningScore: 'Belum Screening'
    },
    {
      id: 'CAND-8815',
      name: 'Dewi Lestari',
      position: 'Shift Leader',
      branch: 'Warmindo Malioboro',
      education: 'D3 Manajemen',
      matchScore: 95,
      recommendation: 'Sangat Direkomendasikan',
      status: 'Penawaran Kontrak',
      appliedDate: '06 Aug 2026',
      screeningScore: '4/4 Pertanyaan Tepat'
    }
  ]);

  // Sync tab navigation when changing role
  const handleRoleToggle = (newRole: string) => {
    setRole(newRole);
    if (newRole === 'owner') {
      setActiveTab('owner_dash');
    } else {
      setActiveTab('jobs');
    }
  };

  // Start job application process
  const initiateApply = (job) => {
    setSelectedJobToApply(job);
    setPdpConsentChecked(false);
    setShowPdpModal(true);
  };

  const confirmApplyJob = () => {
    if (!pdpConsentChecked) return;
    setAppliedJob(selectedJobToApply);
    setHasApplied(true);
    setSelectionStage(2);
    setShowPdpModal(false);
    setActiveTab('screening');
  };

  // AI Chatbot interaction logic
  const handleSendScreeningAnswer = () => {
    if (!screeningAnswerInput.trim()) return;

    const userText = screeningAnswerInput;
    const newMsgs = [
      ...screeningMessages,
      { sender: 'user', text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ];
    setScreeningMessages(newMsgs);
    setScreeningAnswerInput('');
    setIsBotThinking(true);

    setTimeout(() => {
      setIsBotThinking(false);
      if (currentQuestionIdx < SCREENING_QUESTIONS.length) {
        const nextQ = SCREENING_QUESTIONS[currentQuestionIdx];
        setCurrentQuestionIdx((prev) => prev + 1);
        setScreeningMessages((prev) => [
          ...prev,
          { sender: 'bot', text: nextQ, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
      } else {
        setScreeningCompleted(true);
        setSelectionStage(3);
        setScreeningMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: 'Terima kasih atas jawaban lengkap Anda! AI telah melakukan evaluasi awal dengan Skor Kesesuaian 92%. Data Anda diteruskan ke Pemilik Warmindo untuk penentuan jadwal wawancara.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }, 1400);
  };

  // Schedule confirmation helpers
  const handleConfirmInterview = () => {
    setInterviewState(4); // Approved
    // Add msg to conversation
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: 'Saya mengonfirmasi bahwa saya menyetujui jadwal wawancara pada ' + proposedInterviewDate + '.',
        time: 'Baru saja'
      }
    ]);
  };

  const handleSendRescheduleProposal = () => {
    if (!selectedRescheduleSlot) return;
    setInterviewState(3); // Pending owner
    setProposedInterviewDate(selectedRescheduleSlot);

    // Push schedule card message to conversation
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        isScheduleCard: true,
        scheduleDate: selectedRescheduleSlot,
        status: 'Pengajuan Ulang Kandidat (Menunggu Persetujuan)',
        time: 'Baru saja'
      },
      {
        id: (Date.now() + 1).toString(),
        sender: 'user',
        text: `Halo Pemilik Warmindo, mohon maaf saya berhalangan di jadwal semula. Saya mengajukan perubahan jadwal ke: ${selectedRescheduleSlot}. Mohon konfirmasinya. Terima kasih!`,
        time: 'Baru saja'
      }
    ]);
  };

  const handleOwnerApproveSchedule = () => {
    setInterviewState(4);
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'owner',
        text: `Jadwal wawancara ulang Anda (${proposedInterviewDate}) telah SAYA SETUJUI. Sampai jumpa di sesi wawancara!`,
        time: 'Baru saja'
      }
    ]);
  };

  const handleSendGeneralChatMessage = (senderRole) => {
    if (!chatInputText.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: senderRole,
      text: chatInputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInputText('');
  };

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-slate-800 font-sans flex flex-col antialiased selection:bg-[#c9a227] selection:text-white">
      {/* Top Header & Role Switcher */}
      <header className="bg-gradient-to-r from-[#93231f] to-[#591310] text-white shadow-md sticky top-0 z-40 px-4 py-3 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c9a227] to-amber-300 text-[#591310] flex items-center justify-center font-black text-xl shadow-inner border border-amber-200/50">
              W
            </div>
            <div>
              <h1 className="font-bold text-lg leading-snug tracking-tight flex items-center gap-2">
                WARMINDO <span className="text-xs bg-[#c9a227] text-slate-900 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest">AI Recruiter</span>
              </h1>
              <p className="text-xs text-amber-200/80 font-medium">Sistem Rekrutmen & Penempatan UMKM F&B Interaktif</p>
            </div>
          </div>

          {/* Role Switcher Toggle */}
          <div className="flex items-center bg-black/25 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => handleRoleToggle('candidate')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-semibold ${
                role === 'candidate'
                  ? 'bg-[#c9a227] text-slate-950 shadow-md scale-[1.02]'
                  : 'text-amber-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Calon Kandidat</span>
            </button>
            <button
              onClick={() => handleRoleToggle('owner')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-semibold ${
                role === 'owner'
                  ? 'bg-[#c9a227] text-slate-950 shadow-md scale-[1.02]'
                  : 'text-amber-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Pemilik Usaha (Owner)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Shell */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6">
        {/* Vertical Left Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-gradient-to-b from-[#801e1a] to-[#591310] text-white rounded-2xl p-3 shadow-lg border border-amber-900/30 sticky top-20">
            <div className="px-3 py-2.5 mb-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-300/90">
                {role === 'candidate' ? 'Portal Kandidat' : 'Panel Usaha Warmindo'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <nav className="space-y-1">
              {role === 'candidate' ? (
                <>
                  <NavItem
                    active={activeTab === 'jobs'}
                    onClick={() => setActiveTab('jobs')}
                    icon={<Briefcase className="w-4 h-4" />}
                    label="Lowongan Kerja"
                  />
                  <NavItem
                    active={activeTab === 'screening'}
                    onClick={() => setActiveTab('screening')}
                    icon={<Bot className="w-4 h-4" />}
                    label="AI Chatbot Screening"
                    badge={selectionStage >= 2 ? 'Aktif' : null}
                  />
                  <NavItem
                    active={activeTab === 'stages'}
                    onClick={() => setActiveTab('stages')}
                    icon={<Layers className="w-4 h-4" />}
                    label="Tahapan Seleksi"
                  />
                  <NavItem
                    active={activeTab === 'notifications'}
                    onClick={() => setActiveTab('notifications')}
                    icon={<Bell className="w-4 h-4" />}
                    label="Notifikasi & Jadwal"
                    badge={notifications.filter((n) => n.unread).length || null}
                  />
                  <NavItem
                    active={activeTab === 'chat'}
                    onClick={() => setActiveTab('chat')}
                    icon={<MessageSquare className="w-4 h-4" />}
                    label="Percakapan Owner"
                  />
                  <NavItem
                    active={activeTab === 'video_guide'}
                    onClick={() => setActiveTab('video_guide')}
                    icon={<Video className="w-4 h-4" />}
                    label="Panduan Wawancara"
                  />
                  <NavItem
                    active={activeTab === 'contract'}
                    onClick={() => setActiveTab('contract')}
                    icon={<FileText className="w-4 h-4" />}
                    label="Kontrak Kerja PKWT"
                  />
                  <NavItem
                    active={activeTab === 'profile'}
                    onClick={() => setActiveTab('profile')}
                    icon={<User className="w-4 h-4" />}
                    label="Profil Saya"
                  />
                </>
              ) : (
                <>
                  <NavItem
                    active={activeTab === 'owner_dash'}
                    onClick={() => setActiveTab('owner_dash')}
                    icon={<Sliders className="w-4 h-4" />}
                    label="Menu Utama (Dashboard)"
                  />
                  <NavItem
                    active={activeTab === 'owner_candidates'}
                    onClick={() => setActiveTab('owner_candidates')}
                    icon={<Users className="w-4 h-4" />}
                    label="Seleksi & Rekomendasi AI"
                    badge="4"
                  />
                  <NavItem
                    active={activeTab === 'owner_jobs'}
                    onClick={() => setActiveTab('owner_jobs')}
                    icon={<Briefcase className="w-4 h-4" />}
                    label="Kelola Lowongan"
                  />
                  <NavItem
                    active={activeTab === 'owner_branches'}
                    onClick={() => setActiveTab('owner_branches')}
                    icon={<Building2 className="w-4 h-4" />}
                    label="Pengaturan Cabang"
                  />
                  <NavItem
                    active={activeTab === 'owner_chat'}
                    onClick={() => setActiveTab('owner_chat')}
                    icon={<MessageSquare className="w-4 h-4" />}
                    label="Percakapan Kandidat"
                    badge={interviewState === 3 ? 'Penting' : null}
                  />
                  <NavItem
                    active={activeTab === 'owner_placement'}
                    onClick={() => setActiveTab('owner_placement')}
                    icon={<UserCheck className="w-4 h-4" />}
                    label="Penempatan & Kontrak"
                  />
                </>
              )}
            </nav>

            <div className="mt-6 pt-3 border-t border-white/10 px-3">
              <div className="bg-black/30 rounded-xl p-2.5 text-xs text-amber-100/80 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#c9a227] shrink-0" />
                <p className="text-[11px] leading-tight">
                  {role === 'candidate'
                    ? `Melamar di: ${appliedJob ? appliedJob.branchName : 'Belum memilih'}`
                    : '4 Cabang Aktif | 6 Lowongan Terbuka'}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Dynamic View Content */}
        <main className="flex-1 space-y-6 min-w-0">
          {/* CANDIDATE VIEWS */}
          {role === 'candidate' && activeTab === 'jobs' && (
            <CandidateJobListings
              jobs={jobs}
              branches={branches}
              hasApplied={hasApplied}
              appliedJob={appliedJob}
              onInitiateApply={initiateApply}
            />
          )}

          {role === 'candidate' && activeTab === 'screening' && (
            <CandidateScreening
              messages={screeningMessages}
              input={screeningAnswerInput}
              setInput={setScreeningAnswerInput}
              onSend={handleSendScreeningAnswer}
              isThinking={isBotThinking}
              completed={screeningCompleted}
              job={appliedJob}
            />
          )}

          {role === 'candidate' && activeTab === 'stages' && (
            <CandidateSelectionStages currentStage={selectionStage} appliedJob={appliedJob} />
          )}

          {role === 'candidate' && activeTab === 'notifications' && (
            <CandidateNotifications
              notifications={notifications}
              interviewState={interviewState}
              proposedDate={proposedInterviewDate}
              selectedSlot={selectedRescheduleSlot}
              setSelectedSlot={setSelectedRescheduleSlot}
              onConfirmInterview={handleConfirmInterview}
              onSendReschedule={handleSendRescheduleProposal}
              onNavigateChat={() => setActiveTab('chat')}
            />
          )}

          {role === 'candidate' && activeTab === 'chat' && (
            <CandidateConversation
              messages={chatMessages}
              inputText={chatInputText}
              setInputText={setChatInputText}
              onSendMessage={() => handleSendGeneralChatMessage('user')}
            />
          )}

          {role === 'candidate' && activeTab === 'video_guide' && (
            <CandidateVideoGuidance
              checklist={videoChecklist}
              setChecklist={setVideoChecklist}
              inRoom={inVideoRoom}
              setInRoom={setInVideoRoom}
            />
          )}

          {role === 'candidate' && activeTab === 'contract' && (
            <CandidateContractPage
              contract={contractData}
              onConfirmClick={() => setShowContractConfirmModal(true)}
            />
          )}

          {role === 'candidate' && activeTab === 'profile' && (
            <CandidateProfile profile={candidateProfile} setProfile={setCandidateProfile} />
          )}

          {/* OWNER VIEWS */}
          {role === 'owner' && activeTab === 'owner_dash' && (
            <OwnerDashboard
              candidates={candidatesList}
              jobs={jobs}
              branches={branches}
              interviewState={interviewState}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {role === 'owner' && activeTab === 'owner_candidates' && (
            <OwnerCandidateReview candidates={candidatesList} jobs={jobs} />
          )}

          {role === 'owner' && activeTab === 'owner_jobs' && (
            <OwnerJobManagement jobs={jobs} setJobs={setJobs} branches={branches} />
          )}

          {role === 'owner' && activeTab === 'owner_branches' && (
            <OwnerBranchManagement branches={branches} setBranches={setBranches} />
          )}

          {role === 'owner' && activeTab === 'owner_chat' && (
            <OwnerConversation
              messages={chatMessages}
              inputText={chatInputText}
              setInputText={setChatInputText}
              onSendMessage={() => handleSendGeneralChatMessage('owner')}
              quickReplies={quickReplyChips}
              interviewState={interviewState}
              proposedDate={proposedInterviewDate}
              onApproveSchedule={handleOwnerApproveSchedule}
            />
          )}

          {role === 'owner' && activeTab === 'owner_placement' && (
            <OwnerPlacementContract contract={contractData} candidate={candidateProfile} />
          )}
        </main>
      </div>

      {/* UU PDP Consent Modal Dialog */}
      {showPdpModal && (
        <PdpConsentModal
          job={selectedJobToApply}
          checked={pdpConsentChecked}
          setChecked={setPdpConsentChecked}
          onClose={() => setShowPdpModal(false)}
          onConfirm={confirmApplyJob}
        />
      )}

      {/* Contract Finalization Dialog */}
      {showContractConfirmModal && (
        <ContractConfirmModal
          contract={contractData}
          onClose={() => setShowContractConfirmModal(false)}
          onFinalize={() => {
            setContractData((prev) => ({ ...prev, status: 'Confirmed' }));
            setShowContractConfirmModal(false);
          }}
        />
      )}
    </div>
  );
}

function NavItem({ active, onClick, icon, label, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 text-left text-xs font-medium ${
        active
          ? 'bg-[#c9a227] text-slate-950 font-bold shadow-md scale-[1.01]'
          : 'text-amber-100/90 hover:bg-white/10 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className={active ? 'text-slate-950' : 'text-amber-300/80'}>{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span
          className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
            active ? 'bg-slate-950 text-[#c9a227]' : 'bg-amber-400/20 text-amber-300'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function CandidateJobListings({ jobs, branches, hasApplied, appliedJob, onInitiateApply }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('ALL');
  const [selectedJobDetail, setSelectedJobDetail] = useState(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranchFilter === 'ALL' || job.branchId === selectedBranchFilter;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-l-4 border-[#c9a227] p-5 rounded-xl bg-white shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#93231f]" />
          Lowongan Kerja Warmindo Terbuka
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Cari posisi pekerjaan di seluruh cabang Warmindo mitra. Sistem AI kami membantu menyelaraskan kualifikasi Anda.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari posisi (contoh: Juru Masak, Kasir)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={selectedBranchFilter}
            onChange={(e) => setSelectedBranchFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
          >
            <option value="ALL">Semua Cabang Warmindo</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const isAppliedThis = hasApplied && appliedJob?.id === job.id;
          return (
            <div
              key={job.id}
              className={`bg-white rounded-xl border p-5 shadow-sm transition-all hover:shadow-md border-l-4 ${
                isAppliedThis ? 'border-l-[#4a8c5f]' : 'border-l-[#c9a227]'
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <div>
                  <span className="text-[11px] font-bold text-[#93231f] uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded">
                    {job.branchName}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-1">{job.position}</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full shrink-0">
                  {job.headcount} Orang Dibutuhkan
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 my-3">{job.description}</p>

              <div className="space-y-1.5 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span>Usia: {job.ageCriteria}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pendidikan: {job.eduCriteria}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Jadwal: {job.scheduleCriteria}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedJobDetail(job)}
                  className="text-xs text-slate-600 hover:text-slate-900 underline font-medium"
                >
                  Lihat Kriteria Lengkap
                </button>

                {isAppliedThis ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4a8c5f] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" /> Lamaran Dikirim
                  </span>
                ) : (
                  <button
                    onClick={() => onInitiateApply(job)}
                    className="inline-flex items-center gap-1 text-xs font-bold bg-gradient-to-r from-[#93231f] to-[#591310] text-white px-4 py-2 rounded-lg hover:brightness-110 shadow-sm transition-all"
                  >
                    Lamar Sekarang <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Job Detail */}
      {selectedJobDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                  {selectedJobDetail.branchName}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedJobDetail.position}</h3>
              </div>
              <button
                onClick={() => setSelectedJobDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">Deskripsi Pekerjaan</h4>
                <p className="leading-relaxed">{selectedJobDetail.description}</p>
              </div>

              <div className="bg-amber-50/50 border border-amber-200 p-3 rounded-xl space-y-2">
                <h4 className="font-semibold text-amber-900 text-xs">Kriteria Kualifikasi AI Matching:</h4>
                <p>• Umur minimal {selectedJobDetail.ageCriteria}</p>
                <p>• Kualifikasi Pendidikan {selectedJobDetail.eduCriteria}</p>
                <p>• Ketersediaan Shift {selectedJobDetail.scheduleCriteria}</p>
                <p>• Periode Pembukaan: {selectedJobDetail.period}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedJobDetail(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const targetJob = selectedJobDetail;
                  setSelectedJobDetail(null);
                  onInitiateApply(targetJob);
                }}
                className="px-4 py-2 text-xs font-bold bg-[#c9a227] text-slate-950 rounded-lg shadow hover:bg-amber-400"
              >
                Lamar Posisi Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PdpConsentModal({ job, checked, setChecked, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3 text-[#93231f] mb-3">
          <div className="p-2.5 bg-red-100 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Pernyataan Persetujuan Data Pribadi</h3>
            <p className="text-xs text-slate-500">Sesuai UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)</p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 space-y-2 max-h-48 overflow-y-auto border border-slate-200 leading-relaxed my-4">
          <p className="font-semibold text-slate-800">
            Mengajukan Lamaran Posisi: {job?.position} ({job?.branchName})
          </p>
          <p>
            Dengan melanjutkan proses ini, Anda memberikan hak akses penuh kepada manajemen <strong>Warmindo</strong>{' '}
            untuk memproses data pribadi Anda (NIK, Nama, Pendidikan, Riwayat Kerja) strictly untuk keperluan:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Analisis Kesesuaian Kualifikasi menggunakan sistem AI Matching.</li>
            <li>Proses wawancara kerja dan konfirmasi verifikasi latar belakang.</li>
            <li>Penyusunan Perjanjian Kerja Waktu Tertentu (PKWT) jika diterima.</li>
          </ul>
          <p className="text-[11px] text-slate-400 italic">Data Anda tidak akan diperjualbelikan atau disebarkan kepada pihak ketiga tanpa izin tertulis.</p>
        </div>

        {/* Mandatory PDP Checkbox */}
        <label className="flex items-start gap-2.5 cursor-pointer bg-amber-50/80 p-3 rounded-xl border border-amber-200 mb-4">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-0.5 rounded text-[#93231f] focus:ring-[#c9a227] w-4 h-4 cursor-pointer"
          />
          <span className="text-xs text-slate-800 font-medium leading-snug">
            Saya telah membaca, memahami, dan menyetujui pemrosesan data pribadi saya sesuai kebijakan UU PDP.
          </span>
        </label>

        {!checked && (
          <p className="text-[11px] text-amber-700 font-semibold mb-4 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Anda harus mencentang persetujuan di atas untuk melanjutkan tombol "Kirim Lamaran".
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Batal
          </button>
          <button
            disabled={!checked}
            onClick={onConfirm}
            className={`px-5 py-2 text-xs font-bold rounded-lg shadow transition-all ${
              checked
                ? 'bg-[#c9a227] text-slate-950 hover:bg-amber-400 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
            }`}
          >
            Kirim Lamaran & Lanjut AI Screening
          </button>
        </div>
      </div>
    </div>
  );
}

function CandidateScreening({ messages, input, setInput, onSend, isThinking, completed, job }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="bg-white p-4 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-[#93231f] rounded-xl">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base">Asisten Seleksi AI Warmindo</h2>
            <p className="text-xs text-slate-500">
              Posisi: <span className="font-semibold text-slate-800">{job ? job.position : 'Juru Masak'}</span> ({job ? job.branchName : 'Warmindo Sutorejo'})
            </p>
          </div>
        </div>

        {completed ? (
          <span className="text-xs font-bold text-[#4a8c5f] bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> AI Screening Selesai
          </span>
        ) : (
          <span className="text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full animate-pulse border border-amber-200">
            Sesi Wawancara AI Berlangsung
          </span>
        )}
      </div>

      {/* Chat Messages Area */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 h-[420px] overflow-y-auto flex flex-col gap-3 shadow-inner">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 max-w-[85%] ${
              m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                m.sender === 'user' ? 'bg-[#93231f] text-white' : 'bg-[#c9a227] text-slate-950'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-[#93231f] to-[#701a17] text-white rounded-tr-none'
                  : 'bg-slate-100 text-slate-800 border border-slate-200/60 rounded-tl-none'
              }`}
            >
              <p>{m.text}</p>
              <span className={`text-[10px] block mt-1.5 ${m.sender === 'user' ? 'text-amber-200/80 text-right' : 'text-slate-400'}`}>
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 p-2.5 rounded-xl max-w-xs border border-slate-100">
            <Bot className="w-4 h-4 text-[#c9a227] animate-spin" />
            <span>AI Warmindo sedang berpikir dan mengevaluasi...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input Box */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
        <input
          type="text"
          disabled={completed || isThinking}
          placeholder={completed ? 'Proses screening telah selesai.' : 'Ketik jawaban Anda di sini...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          className="flex-1 text-xs bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227] disabled:opacity-60"
        />
        <button
          disabled={completed || isThinking || !input.trim()}
          onClick={onSend}
          className="bg-[#c9a227] text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs hover:bg-amber-400 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow"
        >
          <span>Kirim</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function CandidateSelectionStages({ currentStage, appliedJob }) {
  const stages = [
    { id: 1, name: 'Pendaftaran Lamaran', desc: 'Melengkapi profil kandidat & persetujuan UU PDP' },
    { id: 2, name: 'AI Chatbot Screening', desc: 'Wawancara bot otomatis untuk kecocokan kualifikasi' },
    { id: 3, name: 'Wawancara Pemilik Usaha', desc: 'Sesi tanya jawab langsung atau online video call' },
    { id: 4, name: 'Penawaran Kontrak PKWT', desc: 'Verifikasi hak & kewajiban kerja serta tanda tangan' },
    { id: 5, name: 'Penempatan Cabang', desc: 'Resmi bekerja pada cabang Warmindo pilihan' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Tahapan Seleksi & Rekrutmen</h2>
        <p className="text-xs text-slate-500 mt-1">
          Pantau status lamaran Anda secara real-time pada posisi:{' '}
          <span className="font-semibold text-slate-800">{appliedJob ? appliedJob.position : 'Juru Masak'}</span>
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        {stages.map((stage) => {
          const isDone = currentStage > stage.id;
          const isCurrent = currentStage === stage.id;

          return (
            <div key={stage.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                    isDone
                      ? 'bg-[#4a8c5f] text-white border-[#4a8c5f]'
                      : isCurrent
                      ? 'bg-[#c9a227] text-slate-950 border-[#c9a227] ring-4 ring-amber-100 scale-105'
                      : 'bg-slate-100 text-slate-400 border-slate-300'
                  }`}
                >
                  {isDone ? <Check className="w-5 h-5" /> : stage.id}
                </div>
                {stage.id !== 5 && (
                  <div
                    className={`w-0.5 h-10 my-1 ${
                      isDone ? 'bg-[#4a8c5f]' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm font-bold ${
                      isCurrent
                        ? 'text-slate-900'
                        : isDone
                        ? 'text-[#4a8c5f]'
                        : 'text-slate-400'
                    }`}
                  >
                    {stage.name}
                  </h3>
                  {isCurrent && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Sedang Berlangsung
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[10px] font-bold text-[#4a8c5f] bg-emerald-50 px-2 py-0.5 rounded-full">
                      Selesai
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CandidateNotifications({
  notifications,
  interviewState,
  proposedDate,
  selectedSlot,
  setSelectedSlot,
  onConfirmInterview,
  onSendReschedule,
  onNavigateChat
}) {
  const rescheduleOptions = [
    'Jumat, 14 Agustus 2026 (11:00 - 11:30 WIB)',
    'Sabtu, 15 Agustus 2026 (14:00 - 14:30 WIB)',
    'Senin, 17 Agustus 2026 (10:00 - 10:30 WIB)'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Notifikasi & Konfirmasi Jadwal</h2>
          <p className="text-xs text-slate-500 mt-0.5">Semua pembaruan aktivitas seleksi dan wawancara Warmindo</p>
        </div>
        <Bell className="w-5 h-5 text-[#c9a227]" />
      </div>

      {/* Interview Schedule Interactive State Card */}
      <div className="bg-white rounded-xl border-2 border-amber-300 p-5 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-[#93231f]">
            <Calendar className="w-5 h-5" />
            <h3 className="font-bold text-sm text-slate-900">Jadwal Wawancara Kerja (Pemilik Usaha)</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full">
            {interviewState === 1 && 'Perlu Tanggapan'}
            {interviewState === 2 && 'Pilihan Reschedule'}
            {interviewState === 3 && 'Menunggu Persetujuan Owner'}
            {interviewState === 4 && 'Jadwal Disetujui'}
          </span>
        </div>

        {/* State 1: Proposed by owner */}
        {interviewState === 1 && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Pemilik Usaha mengusulkan waktu wawancara berikut untuk Anda:
            </p>
            <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 text-xs font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c9a227]" />
              <span>{proposedDate}</span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onConfirmInterview}
                className="flex-1 bg-[#4a8c5f] text-white font-bold py-2 rounded-lg text-xs hover:bg-emerald-700 shadow transition-all"
              >
                Konfirmasi Setuju
              </button>
              <button
                onClick={() => onConfirmInterview(false)}
                className="flex-1 bg-amber-500 text-slate-950 font-bold py-2 rounded-lg text-xs hover:bg-amber-400 shadow transition-all"
              >
                Ajukan Reschedule
              </button>
            </div>
          </div>
        )}

        {/* State 2: Reschedule picking */}
        {interviewState === 2 && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 font-medium">
              Pilih slot waktu alternatif yang tersedia atau ajukan dari pesan:
            </p>
            <div className="space-y-2">
              {rescheduleOptions.map((slot, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 bg-slate-50 border rounded-lg text-xs cursor-pointer hover:bg-amber-50/50"
                >
                  <input
                    type="radio"
                    name="slot"
                    value={slot}
                    checked={selectedSlot === slot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="text-[#93231f] focus:ring-[#c9a227]"
                  />
                  <span className="text-slate-800 font-medium">{slot}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={onSendReschedule}
                disabled={!selectedSlot}
                className="bg-[#c9a227] text-slate-950 font-bold px-4 py-2 rounded-lg text-xs hover:bg-amber-400 disabled:opacity-50"
              >
                Kirim Jadwal Baru via Percakapan
              </button>
            </div>
          </div>
        )}

        {/* State 3: Pending owner approval */}
        {interviewState === 3 && (
          <div className="space-y-3 bg-amber-50 p-4 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Clock className="w-4 h-4 animate-spin text-[#c9a227]" />
              <span>Pengajuan Reschedule Terkirim ({proposedDate})</span>
            </div>
            <p className="text-xs text-amber-800">
              Pengajuan slot waktu baru Anda telah dikirimkan ke laman Percakapan Pemilik Usaha.
            </p>
            <button
              onClick={onNavigateChat}
              className="text-xs font-bold text-[#93231f] underline flex items-center gap-1"
            >
              Buka Percakapan Pemilik <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* State 4: Approved */}
        {interviewState === 4 && (
          <div className="space-y-2 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#4a8c5f]" />
              <span>Jadwal Terkonfirmasi: {proposedDate}</span>
            </div>
            <p className="text-xs text-emerald-800">
              Silakan baca Panduan Wawancara Video Call untuk persiapan tes perangkat atau kunjungi lokasi cabang tepat waktu.
            </p>
          </div>
        )}
      </div>

      {/* Notifications List Cards */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3 border-l-4 ${
              n.unread ? 'border-l-[#c9a227]' : 'border-l-slate-300'
            }`}
          >
            <div className="p-2 bg-slate-100 rounded-lg text-[#93231f] shrink-0 mt-0.5">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900">{n.title}</h4>
                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{n.desc}</p>
            </div>
            {n.unread && <span className="w-2 h-2 rounded-full bg-[#c9a227] shrink-0 mt-1.5" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function CandidateConversation({ messages, inputText, setInputText, onSendMessage }) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-100 text-[#93231f] rounded-xl">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Percakapan Langsung Pemilik Warmindo</h2>
            <p className="text-xs text-slate-500">Kirim pesan langsung atau diskusi terkait jadwal wawancara</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 h-[420px] overflow-y-auto flex flex-col gap-3 shadow-inner">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col max-w-[85%] ${
              m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            {m.isScheduleCard ? (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/80 border border-amber-300 rounded-2xl p-4 space-y-2 shadow-xs my-1">
                <div className="flex items-center gap-2 text-[#93231f] font-bold text-xs">
                  <Calendar className="w-4 h-4 text-[#c9a227]" />
                  <span>Usulan Jadwal Wawancara</span>
                </div>
                <p className="text-xs font-bold text-slate-900">{m.scheduleDate}</p>
                <span className="inline-block px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded text-[10px] font-extrabold">
                  {m.status}
                </span>
              </div>
            ) : (
              <div
                className={`rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#93231f] text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            )}
            <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
        <input
          type="text"
          placeholder="Tulis pesan ke Pemilik Usaha..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
          className="flex-1 text-xs bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
        />
        <button
          onClick={onSendMessage}
          className="bg-[#c9a227] text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs hover:bg-amber-400 shadow flex items-center gap-1"
        >
          <span>Kirim</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function CandidateVideoGuidance({ checklist, setChecklist, inRoom, setInRoom }) {
  const allChecked = Object.values(checklist).every(Boolean);

  if (inRoom) {
    return (
      <div className="bg-slate-950 rounded-2xl p-6 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
            <h3 className="font-bold text-sm">Ruang Wawancara Online Warmindo (Mock)</h3>
          </div>
          <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-amber-300 font-mono">
            00:04:12 | Terhubung
          </span>
        </div>

        {/* Video Grid Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
          <div className="bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative p-4">
            <div className="w-16 h-16 rounded-full bg-[#93231f] text-white flex items-center justify-center font-bold text-xl mb-2">
              PM
            </div>
            <p className="text-xs font-semibold text-slate-300">Pemilik Warmindo Sutorejo</p>
            <span className="absolute bottom-3 left-3 text-[10px] bg-black/60 px-2 py-0.5 rounded text-emerald-400">
              Mic Aktif
            </span>
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative p-4">
            <div className="w-16 h-16 rounded-full bg-[#c9a227] text-slate-950 flex items-center justify-center font-bold text-xl mb-2">
              BS
            </div>
            <p className="text-xs font-semibold text-slate-300">Anda (Budi Santoso)</p>
            <span className="absolute bottom-3 left-3 text-[10px] bg-black/60 px-2 py-0.5 rounded text-amber-300">
              Kamera HD
            </span>
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700">
            <Mic className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700">
            <Camera className="w-5 h-5" />
          </button>
          <button
            onClick={() => setInRoom(false)}
            className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-lg"
          >
            Akhiri Sesi Wawancara
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Panduan & Pemeriksaan Wawancara Video</h2>
        <p className="text-xs text-slate-500 mt-1">
          Lakukan verifikasi perangkat sebelum bergabung ke ruang wawancara online dengan Pemilik Usaha Warmindo.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-800 mb-2">Daftar Periksa Persiapan Perangkat:</h3>

        <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border cursor-pointer hover:bg-amber-50/40">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Kamera / Webcam</p>
              <p className="text-[11px] text-slate-500">Pastikan pencahayaan terang dan wajah terlihat jelas</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={checklist.camera}
            onChange={(e) => setChecklist({ ...checklist, camera: e.target.checked })}
            className="w-4 h-4 rounded text-[#93231f] focus:ring-[#c9a227]"
          />
        </label>

        <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border cursor-pointer hover:bg-amber-50/40">
          <div className="flex items-center gap-3">
            <Mic className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Mikrofon & Audio</p>
              <p className="text-[11px] text-slate-500">Uji suara agar terdengar jernih tanpa gema</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={checklist.mic}
            onChange={(e) => setChecklist({ ...checklist, mic: e.target.checked })}
            className="w-4 h-4 rounded text-[#93231f] focus:ring-[#c9a227]"
          />
        </label>

        <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border cursor-pointer hover:bg-amber-50/40">
          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Koneksi Internet</p>
              <p className="text-[11px] text-slate-500">Gunakan koneksi stabil minimal 5 Mbps</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={checklist.network}
            onChange={(e) => setChecklist({ ...checklist, network: e.target.checked })}
            className="w-4 h-4 rounded text-[#93231f] focus:ring-[#c9a227]"
          />
        </label>

        <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border cursor-pointer hover:bg-amber-50/40">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-xs font-bold text-slate-800">Ruangan Hening & Pakaian Rapi</p>
              <p className="text-[11px] text-slate-500">Pilih lokasi tenang dan gunakan pakaian sopan</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={checklist.environment}
            onChange={(e) => setChecklist({ ...checklist, environment: e.target.checked })}
            className="w-4 h-4 rounded text-[#93231f] focus:ring-[#c9a227]"
          />
        </label>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            disabled={!allChecked}
            onClick={() => setInRoom(true)}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
              allChecked
                ? 'bg-[#c9a227] text-slate-950 hover:bg-amber-400 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Video className="w-4 h-4" /> Masuk Ruang Wawancara (Simulasi)
          </button>
        </div>
      </div>
    </div>
  );
}

function CandidateContractPage({ contract, onConfirmClick }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Perjanjian Kerja Waktu Tertentu (PKWT)</h2>
          <p className="text-xs text-slate-500 mt-0.5">Dokumen resmi hak & kewajiban kerja karyawan Warmindo</p>
        </div>
        <FileText className="w-6 h-6 text-[#93231f]" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4 text-center">
          <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wide">
            SURAT PERJANJIAN KERJA WAKTU TERTENTU
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">Nomor Dokumen: {contract.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-400 block font-medium">Nama Pekerja:</span>
            <span className="font-bold text-slate-800 text-sm">{contract.candidateName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">NIK KTP:</span>
            <span className="font-bold text-slate-800 font-mono">{contract.nik}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Jabatan Pekerjaan:</span>
            <span className="font-bold text-[#93231f]">{contract.position}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Penempatan Cabang:</span>
            <span className="font-bold text-slate-800">{contract.branchName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Masa Kontrak:</span>
            <span className="font-bold text-slate-800">{contract.duration}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Gaji & Tunjangan:</span>
            <span className="font-bold text-[#4a8c5f]">{contract.salary}</span>
          </div>
        </div>

        <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
          <h4 className="font-bold text-slate-800 text-sm">Pasal Ketentuan Kerja Warmindo:</h4>
          <p>
            1. Pihak Pekerja bersedia mematuhi jam kerja shift dan standar kebersihan operasional makanan F&B Warmindo.
          </p>
          <p>
            2. Pihak Pengusaha menjamin pembayaran upah secara tepat waktu setiap tanggal 28 bulan berjalan beserta fasilitas insentif penjualan.
          </p>
          <p>
            3. Perjanjian ini berlaku efektif setelah kedua belah pihak menyetujui secara digital pada sistem AI Recruiter.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Status Persetujuan:</span>
            <span
              className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                contract.status === 'Confirmed'
                  ? 'bg-emerald-100 text-[#4a8c5f]'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {contract.status === 'Confirmed' ? 'Telah Ditandatangani' : 'Menunggu Konfirmasi Digital'}
            </span>
          </div>

          {contract.status !== 'Confirmed' && (
            <button
              onClick={onConfirmClick}
              className="bg-[#c9a227] text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-amber-400 shadow transition-all"
            >
              Konfirmasi & Tanda Tangan PKWT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ContractConfirmModal({ contract, onClose, onFinalize }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center gap-3 text-amber-600 mb-3">
          <AlertCircle className="w-6 h-6" />
          <h3 className="font-bold text-slate-900 text-base">Konfirmasi Akhir Kontrak PKWT</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Apakah Anda yakin rincian kontrak untuk posisi <strong>{contract.position}</strong> di{' '}
          <strong>{contract.branchName}</strong> sudah benar? Setelah dikonfirmasi, dokumen tidak dapat diubah lagi.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            Edit Lagi
          </button>
          <button
            onClick={onFinalize}
            className="px-5 py-2 text-xs font-bold bg-[#4a8c5f] text-white rounded-lg shadow hover:bg-emerald-700"
          >
            Selesai & Setujui
          </button>
        </div>
      </div>
    </div>
  );
}

function CandidateProfile({ profile, setProfile }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Profil Saya</h2>
          <p className="text-xs text-slate-500 mt-0.5">Ringkasan biodata dan kualifikasi pelamar</p>
        </div>
        <User className="w-5 h-5 text-[#93231f]" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-medium"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">NIK (Nomor Induk Kependudukan)</label>
            <input
              type="text"
              value={profile.nik}
              onChange={(e) => setProfile({ ...profile, nik: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-medium font-mono"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Pendidikan Terakhir</label>
            <input
              type="text"
              value={profile.education}
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-medium"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Nomor Kontak / WA</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-medium"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-400 block text-xs mb-1">Pengalaman Kerja F&B</label>
          <textarea
            rows="3"
            value={profile.experience}
            onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-medium"
          />
        </div>
      </div>
    </div>
  );
}

function OwnerDashboard({ candidates, jobs, branches, interviewState, onNavigate }) {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#93231f] to-[#591310] text-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
            Ringkasan Usaha Warmindo
          </span>
          <h2 className="text-xl font-extrabold mt-1">Menu Utama Pemilik Usaha</h2>
          <p className="text-xs text-amber-100/80 mt-1">
            Pengawasan rekrutmen, kecocokan kandidat AI, dan jadwal wawancara lintas cabang.
          </p>
        </div>
        <Store className="w-10 h-10 text-amber-300 opacity-80 hidden sm:block" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs border-l-4 border-l-[#c9a227]">
          <span className="text-xs text-slate-400 font-medium">Total Cabang Aktif</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{branches.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">Surabaya, Bandung, Jogja</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs border-l-4 border-l-[#93231f]">
          <span className="text-xs text-slate-400 font-medium">Lowongan Terbuka</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{jobs.length}</div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block">6 Kebutuhan Staf</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs border-l-4 border-l-[#4a8c5f]">
          <span className="text-xs text-slate-400 font-medium">Kandidat Terdaftar</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{candidates.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">Rata-rata Match Score 84%</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs border-l-4 border-l-amber-500">
          <span className="text-xs text-slate-400 font-medium">Perlu Respon Pemilik</span>
          <div className="text-2xl font-black text-amber-700 mt-1">{interviewState === 3 ? '1' : '0'}</div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block">Jadwal Reschedule Pending</span>
        </div>
      </div>

      {/* Overview Recent Candidates */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-sm">Pelamar Terbaru & Skor AI Matching</h3>
          <button
            onClick={() => onNavigate('owner_candidates')}
            className="text-xs text-[#93231f] font-bold hover:underline flex items-center gap-1"
          >
            Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {candidates.map((cand) => (
            <div
              key={cand.id}
              className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between gap-3"
            >
              <div>
                <h4 className="font-bold text-xs text-slate-900">{cand.name}</h4>
                <p className="text-[11px] text-slate-500">
                  {cand.position} • <span className="font-semibold text-slate-700">{cand.branch}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                    cand.matchScore >= 90
                      ? 'bg-emerald-50 text-[#4a8c5f] border-emerald-200'
                      : cand.matchScore >= 80
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  AI Match: {cand.matchScore}%
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">{cand.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OwnerCandidateReview({ candidates, jobs }) {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Seleksi Kandidat & Match Score AI</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Rekomendasi kecocokan pelamar berdasarkan kriteria kualifikasi cabang Warmindo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate List */}
        <div className="space-y-3">
          {candidates.map((cand) => (
            <div
              key={cand.id}
              onClick={() => setSelectedCandidate(cand)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedCandidate?.id === cand.id
                  ? 'bg-amber-50/70 border-[#c9a227] shadow-sm'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-900 text-xs">{cand.name}</h4>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-[#c9a227] text-slate-950 rounded-full">
                  {cand.matchScore}% Match
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{cand.position}</p>
              <p className="text-[10px] text-amber-800 font-semibold mt-1">{cand.branch}</p>
            </div>
          ))}
        </div>

        {/* Selected Candidate Detail Panel */}
        {selectedCandidate && (
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{selectedCandidate.name}</h3>
                <p className="text-xs text-slate-500">
                  Melamar posisi: <span className="font-bold text-slate-800">{selectedCandidate.position}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-[#4a8c5f] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                  {selectedCandidate.recommendation}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Dikalkulasi oleh AI Warmindo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400">Pendidikan:</span>
                <p className="font-bold text-slate-800">{selectedCandidate.education}</p>
              </div>
              <div>
                <span className="text-slate-400">Cabang Penempatan:</span>
                <p className="font-bold text-slate-800">{selectedCandidate.branch}</p>
              </div>
              <div>
                <span className="text-slate-400">Status Seleksi:</span>
                <p className="font-bold text-[#93231f]">{selectedCandidate.status}</p>
              </div>
              <div>
                <span className="text-slate-400">Hasil AI Screening:</span>
                <p className="font-bold text-emerald-700">{selectedCandidate.screeningScore}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">Uraian Evaluasi AI Matching:</h4>
              <p className="text-slate-600 bg-amber-50/50 p-3 rounded-xl border border-amber-200 leading-relaxed">
                Kandidat memiliki latar belakang pendidikan yang relevan dengan bidang F&B, serta mencatatkan respon yang sangat baik pada AI Chatbot Screening terkait kesiapan shift malam dan manajemen antrean pesanan.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OwnerJobManagement({ jobs, setJobs, branches }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJob, setNewJob] = useState({
    position: '',
    branchId: branches[0]?.id || '',
    headcount: 2,
    ageCriteria: '18 - 25 tahun',
    eduCriteria: 'SMA/SMK',
    scheduleCriteria: 'Shift Rotasi',
    description: ''
  });

  const handleCreateJob = () => {
    if (!newJob.position || !newJob.description) return;
    const branchObj = branches.find((b) => b.id === newJob.branchId);
    const created = {
      id: `JOB-${Date.now()}`,
      branchId: newJob.branchId,
      branchName: branchObj ? branchObj.name : 'Warmindo',
      position: newJob.position,
      headcount: Number(newJob.headcount),
      ageCriteria: newJob.ageCriteria,
      eduCriteria: newJob.eduCriteria,
      scheduleCriteria: newJob.scheduleCriteria,
      status: 'open',
      period: '12 Aug 2026 - 12 Sep 2026',
      description: newJob.description
    };
    setJobs([created, ...jobs]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Manajemen Lowongan Kerja</h2>
          <p className="text-xs text-slate-500 mt-0.5">Kelola posisi dan kriteria staf untuk seluruh cabang Warmindo</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#c9a227] text-slate-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-400 shadow flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Buka Lowongan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((j) => (
          <div key={j.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded uppercase">
              {j.branchName}
            </span>
            <h3 className="font-bold text-slate-900 text-sm mt-1">{j.position}</h3>
            <p className="text-xs text-slate-500 line-clamp-2">{j.description}</p>
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between">
              <span>Dibutuhkan: {j.headcount} Orang</span>
              <span className="text-emerald-600 font-semibold">Status: Aktif</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Tambah Lowongan Baru Warmindo</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 mb-1">Nama Posisi Pekerjaan</label>
                <input
                  type="text"
                  placeholder="Contoh: Barista & Pembuat Minuman"
                  value={newJob.position}
                  onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
                  className="w-full border p-2.5 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Cabang Warmindo</label>
                <select
                  value={newJob.branchId}
                  onChange={(e) => setNewJob({ ...newJob, branchId: e.target.value })}
                  className="w-full border p-2.5 rounded-lg"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Deskripsi & Tugas</label>
                <textarea
                  rows="3"
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="w-full border p-2.5 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs text-slate-500">
                Batal
              </button>
              <button
                onClick={handleCreateJob}
                className="px-5 py-2 text-xs font-bold bg-[#c9a227] text-slate-950 rounded-lg shadow"
              >
                Simpan Lowongan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OwnerBranchManagement({ branches, setBranches }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Pengaturan Cabang Warmindo</h2>
          <p className="text-xs text-slate-500 mt-0.5">Daftar lokasi, kontak manajer, dan statistik karyawan</p>
        </div>
        <Building2 className="w-5 h-5 text-[#93231f]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map((b) => (
          <div key={b.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">{b.name}</h3>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                ID: {b.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" /> {b.address}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Manajer: {b.manager}</span>
              <span className="font-bold text-[#4a8c5f]">{b.employeeCount} Karyawan</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OwnerConversation({
  messages,
  inputText,
  setInputText,
  onSendMessage,
  quickReplies,
  interviewState,
  proposedDate,
  onApproveSchedule
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Percakapan Kandidat (Pemilik Usaha)</h2>
          <p className="text-xs text-slate-500">Kandidat: Budi Santoso (Posisi: Juru Masak Warmindo Sutorejo)</p>
        </div>
        <MessageSquare className="w-5 h-5 text-[#93231f]" />
      </div>

      {/* Special Approval Notification if candidate proposed new schedule */}
      {interviewState === 3 && (
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              Pengajuan Reschedule Masuk!
            </span>
            <p className="text-xs text-slate-800 mt-0.5">
              Kandidat mengajukan perubahan waktu ke: <strong>{proposedDate}</strong>
            </p>
          </div>
          <button
            onClick={onApproveSchedule}
            className="bg-[#4a8c5f] text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-emerald-700 shadow shrink-0"
          >
            Setujui Jadwal Ini
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 h-[380px] overflow-y-auto flex flex-col gap-3 shadow-inner">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col max-w-[85%] ${
              m.sender === 'owner' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            {m.isScheduleCard ? (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 space-y-2 shadow-xs my-1">
                <div className="flex items-center gap-2 text-[#93231f] font-bold text-xs">
                  <Calendar className="w-4 h-4 text-[#c9a227]" />
                  <span>Usulan Jadwal Wawancara</span>
                </div>
                <p className="text-xs font-bold text-slate-900">{m.scheduleDate}</p>
                <span className="inline-block px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded text-[10px] font-extrabold">
                  {m.status}
                </span>
              </div>
            ) : (
              <div
                className={`rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === 'owner'
                    ? 'bg-[#93231f] text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            )}
            <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Quick Reply Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-slate-400">Template Respon Cepat (Quick Chips):</span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {quickReplies.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(chip)}
              className="text-[11px] bg-white border border-slate-200 hover:border-[#c9a227] px-3 py-1.5 rounded-full text-slate-700 whitespace-nowrap shadow-2xs transition-all"
            >
              + {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
        <input
          type="text"
          placeholder="Atau ketik jadwal alternatif secara manual di sini..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
          className="flex-1 text-xs bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]"
        />
        <button
          onClick={onSendMessage}
          className="bg-[#c9a227] text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs hover:bg-amber-400 shadow flex items-center gap-1"
        >
          <span>Kirim</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function OwnerPlacementContract({ contract, candidate }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#c9a227] border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Penempatan Cabang & Kontrak Kerja PKWT</h2>
          <p className="text-xs text-slate-500 mt-0.5">Generasi otomatis perjanjian kerja berbasis data pelamar</p>
        </div>
        <UserCheck className="w-5 h-5 text-[#4a8c5f]" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-sm">Status PKWT Tergenerasi Automatis</h3>
          <span className="text-xs font-bold text-[#4a8c5f] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {contract.status === 'Confirmed' ? 'Telah Disetujui Pelamar' : 'Draf Dikirim Ke Pelamar'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-400">Nama Pekerja:</span>
            <p className="font-bold text-slate-800">{contract.candidateName}</p>
          </div>
          <div>
            <span className="text-slate-400">Posisi Penempatan:</span>
            <p className="font-bold text-[#93231f]">{contract.position}</p>
          </div>
          <div>
            <span className="text-slate-400">Cabang Warmindo:</span>
            <p className="font-bold text-slate-800">{contract.branchName}</p>
          </div>
          <div>
            <span className="text-slate-400">Gaji Bulanan:</span>
            <p className="font-bold text-[#4a8c5f]">{contract.salary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}