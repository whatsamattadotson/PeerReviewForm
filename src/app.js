import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Slider } from './components/ui/slider';
import { useToast } from './components/ui/use-toast';
import { Star, Send, User, MessageSquare, BarChart2 } from 'lucide-react';

const ReviewForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    workPerformance: [1],
    creativity: [1],
    reliability: [1],
    leadership: [1],
    bestCharacteristic: '',
    worstCharacteristic: '',
    additionalComments: ''
  });

  const bestCharacteristics = [
    'Communication Skills',
    'Problem Solving',
    'Drive/Fortitude',
    'Innovative',
    'Adaptability',
    'Creativity',
    'Leadership',
    'Empathy',
    'Honesty',
    'Attention to Detail',
    'All of the Above',
  ];

  const worstCharacteristics = [
    'Perfectionism',
    'Impatience',
    'Overthinking',
    'Too Self-Reliant',
    'Public Speaking',
    'Risk Taking',
    'Stubborn',
    'All of the Above',
  ];

  const handleSliderChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.bestCharacteristic || !formData.worstCharacteristic) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const hiddenForm = document.createElement('form');
    hiddenForm.setAttribute('data-netlify', 'true');
    hiddenForm.setAttribute('name', 'review-form');
    Object.keys(formData).forEach(key => {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', key);
        input.setAttribute('value', typeof formData[key] === 'object' ? formData[key][0] : formData[key]);
        hiddenForm.appendChild(input);
    });
    
    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
    document.body.removeChild(hiddenForm);

    toast({
      title: "Review Submitted",
      description: "Thank you for providing valuable feedback. -Matt"
    });

    setFormData({
      name: '',
      email: '',
      workPerformance: [1],
      creativity: [1],
      reliability: [1],
      leadership: [1],
      bestCharacteristic: '',
      worstCharacteristic: '',
      additionalComments: ''
    });
  };

  const getRatingLabel = (value) => {
    if (value <= 2) return 'Poor';
    if (value <= 4) return 'Below Average';
    if (value <= 6) return 'Average';
    if (value <= 8) return 'Good';
    return 'Excellent';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-br from-custom-dark-blue-grey/80 to-custom-muted-green-grey/80 backdrop-blur-lg rounded-3xl border border-custom-light-blue-grey/20 shadow-2xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img src="https://horizons-cdn.hostinger.com/aa700a9a-4ec1-4ac6-840b-89f4f82d17c7/e8c82bbd6781b324f99368bdf7cc3fa7.gif" alt="Decorative header image" className="w-full h-48 object-cover" />
          <div className="p-8 text-center -mt-8">
               <h1 className="text-4xl font-bold bg-gradient-to-r from-custom-light-blue-grey to-custom-burnt-orange bg-clip-text text-transparent mb-2">
                 Review Form
               </h1>
               <p className="text-custom-light-blue-grey text-lg">
                 Share your honest feedback about my work and performance
               </p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8 px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-custom-burnt-orange" />
              <h2 className="text-xl font-semibold text-custom-light-blue-grey">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-custom-light-blue-grey">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  className="bg-custom-dark-blue-grey/50 border-custom-light-blue-grey/30 text-custom-light-blue-grey placeholder:text-custom-light-blue-grey/70 focus:border-custom-burnt-orange"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-custom-light-blue-grey">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-custom-dark-blue-grey/50 border-custom-light-blue-grey/30 text-custom-light-blue-grey placeholder:text-custom-light-blue-grey/70 focus:border-custom-burnt-orange"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-custom-burnt-orange" />
              <h2 className="text-xl font-semibold text-custom-light-blue-grey">Performance Ratings</h2>
            </div>

            {[
              { key: 'workPerformance', label: 'Work Performance', icon: '💼' },
              { key: 'creativity', label: 'Creativity', icon: '🎨' },
              { key: 'reliability', label: 'Reliability', icon: '⚡' },
              { key: 'leadership', label: 'Leadership', icon: '👑' }
            ].map((rating, index) => (
              <motion.div
                key={rating.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="bg-custom-dark-blue-grey/30 rounded-xl p-6 border border-custom-light-blue-grey/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-custom-light-blue-grey text-lg flex items-center gap-2">
                    <span>{rating.icon}</span>
                    {rating.label}
                  </Label>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-custom-burnt-orange">
                      {formData[rating.key][0]}/10
                    </div>
                    <div className="text-sm text-custom-light-blue-grey/80">
                      {getRatingLabel(formData[rating.key][0])}
                    </div>
                  </div>
                </div>
                <Slider
                  value={formData[rating.key]}
                  onValueChange={(value) => handleSliderChange(rating.key, value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-custom-light-blue-grey/60 mt-2">
                  <span>1 - Poor</span>
                  <span>10 - Excellent</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-custom-burnt-orange" />
              <h2 className="text-xl font-semibold text-custom-light-blue-grey">Characteristics Assessment</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-custom-light-blue-grey">Best Characteristic *</Label>
                <Select value={formData.bestCharacteristic} onValueChange={(value) => handleSelectChange('bestCharacteristic', value)}>
                  <SelectTrigger className="bg-custom-dark-blue-grey/50 border-custom-light-blue-grey/30 text-custom-light-blue-grey">
                    <SelectValue placeholder="Select best characteristic" />
                  </SelectTrigger>
                  <SelectContent className="bg-custom-dark-blue-grey border-custom-light-blue-grey/30">
                    {bestCharacteristics.map((characteristic) => (
                      <SelectItem key={characteristic} value={characteristic} className="text-custom-light-blue-grey hover:bg-custom-muted-green-grey/30">
                        {characteristic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-custom-light-blue-grey">Area for Improvement *</Label>
                <Select value={formData.worstCharacteristic} onValueChange={(value) => handleSelectChange('worstCharacteristic', value)}>
                  <SelectTrigger className="bg-custom-dark-blue-grey/50 border-custom-light-blue-grey/30 text-custom-light-blue-grey">
                    <SelectValue placeholder="Select area for improvement" />
                  </SelectTrigger>
                  <SelectContent className="bg-custom-dark-blue-grey border-custom-light-blue-grey/30">
                    {worstCharacteristics.map((characteristic) => (
                      <SelectItem key={characteristic} value={characteristic} className="text-custom-light-blue-grey hover:bg-custom-muted-green-grey/30">
                        {characteristic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="space-y-4"
          >
            <Label htmlFor="comments" className="text-custom-light-blue-grey text-lg">Additional Comments</Label>
            <Textarea
              id="comments"
              value={formData.additionalComments}
              onChange={(e) => handleInputChange('additionalComments', e.target.value)}
              placeholder="Share any additional thoughts, specific examples, or suggestions..."
              className="bg-custom-dark-blue-grey/50 border-custom-light-blue-grey/30 text-custom-light-blue-grey placeholder:text-custom-light-blue-grey/70 focus:border-custom-burnt-orange min-h-[120px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="pt-4"
          >
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-custom-muted-green-grey to-custom-burnt-orange hover:from-custom-muted-green-grey/90 hover:to-custom-burnt-orange/90 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Review
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

const ResultsWidget = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // This is a placeholder for where you would load your data from a JSON file.
        // You'll need to create a JSON file and place it in the public folder.
        fetch('/reviews.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    setStats({
                        count: 0,
                        workPerformance: 0,
                        creativity: 0,
                        reliability: 0,
                        leadership: 0,
                        bestCharacteristic: 'N/A',
                        worstCharacteristic: 'N/A',
                    });
                    return;
                }

                const calculateAverage = (key) => {
                    const total = data.reduce((sum, item) => sum + (parseInt(item[key]) || 0), 0);
                    return (total / data.length).toFixed(1);
                };

                const findMostFrequent = (key) => {
                    const counts = data.reduce((acc, item) => {
                        acc[item[key]] = (acc[item[key]] || 0) + 1;
                        return acc;
                    }, {});
                    const mostFrequent = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), null);
                    return mostFrequent || 'N/A';
                };

                setStats({
                    count: data.length,
                    workPerformance: calculateAverage('workPerformance'),
                    creativity: calculateAverage('creativity'),
                    reliability: calculateAverage('reliability'),
                    leadership: calculateAverage('leadership'),
                    bestCharacteristic: findMostFrequent('bestCharacteristic'),
                    worstCharacteristic: findMostFrequent('worstCharacteristic'),
                });
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const statItems = stats ? [
        { label: 'Total Reviews', value: stats.count, emoji: '📝' },
        { label: 'Work Performance', value: `${stats.workPerformance}/10`, emoji: '💼' },
        { label: 'Creativity', value: `${stats.creativity}/10`, emoji: '🎨' },
        { label: 'Reliability', value: `${stats.reliability}/10`, emoji: '⚡' },
        { label: 'Leadership', value: `${stats.leadership}/10`, emoji: '👑' },
        { label: 'Best Trait', value: stats.bestCharacteristic, emoji: '🏆' },
        { label: 'Needs Improvement', value: stats.worstCharacteristic, emoji: '📈' },
    ] : [];
    
    if (loading) return <div className="text-center text-custom-light-blue-grey">Loading stats...</div>;
    if (error) return <div className="text-center text-red-500">Error loading data: {error}</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
        >
            <div className="bg-gradient-to-br from-custom-dark-blue-grey/80 to-custom-muted-green-grey/80 backdrop-blur-lg rounded-3xl border border-custom-light-blue-grey/20 shadow-2xl overflow-hidden p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-custom-light-blue-grey to-custom-burnt-orange bg-clip-text text-transparent mb-6 text-center">
                    Review Averages
                </h2>
                
                <div className="space-y-4">
                    {statItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.4 }}
                            className="bg-custom-dark-blue-grey/30 rounded-xl p-4 flex items-center justify-between border border-custom-light-blue-grey/20"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{item.emoji}</span>
                                <span className="text-lg font-semibold text-custom-light-blue-grey">{item.label}</span>
                            </div>
                            <div className="text-lg font-bold text-custom-burnt-orange">
                                {item.value}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-custom-dark-blue-grey text-white flex flex-col items-center py-10">
                <div className="flex space-x-4 mb-8">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `flex items-center gap-2 p-3 rounded-lg transition-colors ${isActive ? 'bg-custom-burnt-orange text-white' : 'bg-custom-light-blue-grey/20 text-custom-light-blue-grey hover:bg-custom-light-blue-grey/30'}`
                        }
                    >
                        <Send size={18} /> Review Form
                    </NavLink>
                    <NavLink 
                        to="/results" 
                        className={({ isActive }) => 
                            `flex items-center gap-2 p-3 rounded-lg transition-colors ${isActive ? 'bg-custom-burnt-orange text-white' : 'bg-custom-light-blue-grey/20 text-custom-light-blue-grey hover:bg-custom-light-blue-grey/30'}`
                        }
                    >
                        <BarChart2 size={18} /> View Results
                    </NavLink>
                </div>

                <Routes>
                    <Route path="/" element={<ReviewForm />} />
                    <Route path="/results" element={<ResultsWidget />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;